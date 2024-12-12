import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Redux/userSlice";

const Login = () => {
  const [input, setInput] = useState({});
  const nav = useNavigate();
  const dispatch = useDispatch();

  const getInput = (e) => {
    const { value, name } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(input)); // Assuming input is the action payload
    nav("/"); // Navigate to the home page after successful dispatch
  };

  return (
    <div className="w-1/2 mx-auto">
      <form onSubmit={onSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            className="grow"
            placeholder="daisy@site.com"
            onChange={getInput}
            name="email"
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
