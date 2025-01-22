import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Redux/userSlice";
import axiosServer from "../Redux/api";

const Login = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // const handleSignUp = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}/signup`,
  //       { ...input },
  //       { withCredentials: true }
  //     );
  //     dispatch(addUser(res.data.data));
  //     navigate("/profile");
  //   } catch (err) {
  //     setError(err?.response?.data || "Something went wrong");
  //   }
  // };

  const handleLogin = async () => {
    try {
      const res = await axiosServer.post(
        `/login`,
        { emailId: input.emailId, password: input.password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="w-full">
      <h2 className="card-title justify-center w-3/4 mx-auto">
        {isLoginForm ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={onSubmit} className=" w-1/2 mx-auto">
        {!isLoginForm && (
          <div className="">
            <label className="form-control w-full max-w-xs my-2 mx-auto ">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                name="firstName"
                value={input.firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2 mx-auto">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                name="lastName"
                value={input.lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
              />
            </label>
          </div>
        )}
        <label className="form-control w-full max-w-xs my-2 mx-auto">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            name="emailId"
            value={input.emailId}
            className="input input-bordered w-full max-w-xs"
            onChange={handleInputChange}
          />
        </label>
        <label className="form-control w-full max-w-xs my-2 mx-auto">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            name="password"
            value={input.password}
            className="input input-bordered w-full max-w-xs"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        {error && <p className="text-red-500">Error: {error}</p>}
      </form>
      <button
        onClick={() => setIsLoginForm(!isLoginForm)}
        className="btn btn-secondary mt-4"
      >
        {isLoginForm ? "Switch to Sign Up" : "Switch to Login"}
      </button>
    </div>
  );
};

export default Login;
