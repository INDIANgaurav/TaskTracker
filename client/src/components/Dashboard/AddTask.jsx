import axios from "axios";
import React, { useState } from "react";

const AddTask = ({ setAddTaskDiv }) => {
  const [values, setValues] = useState({
    project: "",
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://tasktracker-1-api.onrender.com/api/v1/addTask",
        values,
        { withCredentials: true }
      );
      alert(res.data.success);
      setValues({
        project: "",
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart",
      });
      setAddTaskDiv("hidden");
  
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded px-4 py-4 w-[40%] ">
      <h1 className="text-center font-semibold text-xl">Add Task</h1>
      <hr className="mb-4 mt-2" />
      <form onSubmit={addTask} className="flex flex-col gap-4">
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Project"
          name="project"
          value={values.project}
          onChange={change}
        />
        <input
          type="text"
          className="border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="Title"
          name="title"
          value={values.title}
          onChange={change}
        />
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2 ">Select Priority</h3>
            <select
              name="priority"
              value={values.priority}
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              onChange={change}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="w-full">
            <h3 className="mb-2 ">Select Status</h3>
            <select
              name="status"
              value={values.status}
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              onChange={change}
            >
              <option value="yetToStart">Yet To Start</option>
              <option value="inProgress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vh]"
          value={values.description}
          onChange={change}
        ></textarea>

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            className="w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
          >
            Add Task
          </button>
          <button
            type="button"
            className="w-full border-black bg-red-600 py-2 hover:bg-red-700 transition-all duration-300 text-white rounded"
            onClick={() => setAddTaskDiv("hidden")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
