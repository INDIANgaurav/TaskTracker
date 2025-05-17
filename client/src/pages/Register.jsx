import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
  });
  const changeHandler = (e) => {
    setValue((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://tasktracker-1-api.onrender.com/api/v1/register",
        value
      );
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] ">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-600">
          Task-Tracker
        </h1>
        <h3 className="text-center font-semibold text-xinc-900">
          Register With Task-Tracker
        </h3>
      </div>
      <div className="w-[60vw]  md:w-[50vw] lg:w-[30vw] mt-4">
        <form
          type="text"
          className="flex flex-col gap-4"
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            name="username"
            value={value.username}
            required
            placeholder="Username"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            onChange={changeHandler}
          />
          <input
            type="email"
            required
            name="email"
            value={value.email}
            placeholder="Email-Id"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            onChange={changeHandler}
          />
          <input
            type="password"
            name="password"
            required
            value={value.password}
            placeholder="Password"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            onChange={changeHandler}
          />
          <input
            type="text"
            name="country"
            value={value.country}
            required
            placeholder="Country"
            className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none"
            onChange={changeHandler}
          />
          <button className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300 ">
            Signup
          </button>
          <p className="text-center font-semibold text-gray-900">
            Alrady have an account?{" "}
            <Link className="text-blue-800" to="/login">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
