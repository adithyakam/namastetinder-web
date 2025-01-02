import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Redux/userSlice";
import axiosServer from "../Redux/api";

const Login = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});

  const nav = useNavigate();
  const dispatch = useDispatch();

  const getInput = (e) => {
    const { value, name } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const userLogin = async () => {
    try {
      const user = await axiosServer.post("/login", input, {
        withCredentials: true,
      });

      dispatch(addUser(user));
      nav("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    userLogin();
  };

  return (
    <div className="w-1/2 mx-auto">
      <form onSubmit={onSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="email"
            className="grow"
            placeholder="daisy@site.com"
            onChange={getInput}
            name="emailId"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            type="password"
            className="grow"
            onChange={getInput}
            name="password"
          />
        </label>

        <button type="submit" className="btn btn-outline btn-primary m-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
