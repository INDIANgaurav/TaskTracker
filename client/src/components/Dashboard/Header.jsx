import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4040/api/v1/logout",
        {},
        { withCredentials: true }
      );
      console.log(res);
      toast.success("Logged-Out", res.data.message);
   localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  return (
    <div className="flex px-2 py-4 items-center justify-between border-b ">
      <Toaster />
      <div>
        <h1 className="text-2xl text-blue-800 font-semibold">Task-Tracker</h1>
      </div>
      <div className="flex gap-7">
        <button
          className="hover:text-blue-800 transition-all duration-300"
          onClick={() => setAddTaskDiv("block")}
        >
          Add Task
        </button>
        <button
          onClick={logoutHandler}
          className="text-2xl hover:text-red-600 transition-all duration-300"
        >
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
};

export default Header;
