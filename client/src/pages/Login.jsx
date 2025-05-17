import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
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
        "http://localhost:4040/api/v1/login",
        value,
        {
          withCredentials: true,
        }
      );
      toast.success("Registered Successfully");
      localStorage.setItem("userLoggedIn" , "yes")
      navigate("/dashboard")
      console.log(res.data.success);
    } catch (error) {
      toast.error("user already exists!", error.response.data);
      navigate("/register")
      console.log(error)
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] ">
        <h1 className="text-3xl font-bold text-center mb-1 text-blue-600">
          Task-Tracker
        </h1>
        <h3 className="text-center font-semibold text-zinc-900">
          Login With Task-Tracker
        </h3>
      </div>
      <div className="w-[60vw]  md:w-[50vw] lg:w-[30vw] mt-4">
        <form
          type="text"
          className="flex flex-col gap-4"
          onSubmit={handleOnSubmit}
        >
          <input
            type="email"
            required
            value={value.email}
            name="email"
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

          <button className="bg-blue-800 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300 ">
            Login
          </button>
          <p className="text-center font-semibold text-gray-900">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-800" >
              Signup
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
