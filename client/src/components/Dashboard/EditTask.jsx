import axios from "axios";
import { useEffect, useState } from "react";

const EditTask = ({ setEditTask }) => {
  const editTaskId = window.sessionStorage.getItem("editTaskId");

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

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://tasktracker-1-api.onrender.com/api/v1/getTask/${editTaskId}`,
          {
            withCredentials: true,
          }
        );
        setValues(res.data.taskDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const editTask = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://tasktracker-1-api.onrender.com/api/v1/editTask/${id}`,
        values,
        { withCredentials: true }
      );
      alert(res.data.success);
      window.sessionStorage.clear("editTaskId");
      setEditTask("hidden");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  const deleteTask = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `https://tasktracker-1-api.onrender.com/api/v1/deleteTask/${id}`,
        { withCredentials: true }
      );
      alert(res.data.success);
      window.sessionStorage.clear("editTaskId");
      setEditTask("hidden");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      className="
        bg-white rounded px-6 py-6
        w-[90%] max-w-3xl
        mx-auto
        sm:w-[70%]
        md:w-[50%]
        lg:w-[40%]
        shadow-lg
        overflow-auto
        max-h-[90vh]
      "
      style={{ minHeight: "auto" }}
    >
      <h1 className="text-center font-semibold text-xl mb-4">Edit Task</h1>
      <hr className="mb-6" />
      <form
        onSubmit={(e) => editTask(e, values._id)}
        className="flex flex-col gap-5"
      >
        <input
          type="text"
          className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
          placeholder="Project"
          name="project"
          value={values.project}
          onChange={change}
        />
        <input
          type="text"
          className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
          placeholder="Title"
          name="title"
          value={values.title}
          onChange={change}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Select Priority</label>
            <select
              name="priority"
              value={values.priority}
              className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
              onChange={change}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Select Status</label>
            <select
              name="status"
              value={values.status}
              className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
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
          className="border px-3 py-2 rounded border-zinc-300 outline-none resize-none w-full"
          style={{ height: "150px", minHeight: "120px", maxHeight: "250px" }}
          value={values.description}
          onChange={change}
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-800 py-3 hover:bg-blue-700 transition-all duration-300 text-white rounded"
          >
            Edit Task
          </button>
          <button
            type="button"
            className="flex-1 bg-red-600 py-3 hover:bg-red-700 transition-all duration-300 text-white rounded"
            onClick={(e) => deleteTask(e, values._id)}
          >
            Delete Task
          </button>
          <button
            type="button"
            className="flex-1 bg-green-600 py-3 hover:bg-green-700 transition-all duration-300 text-white rounded"
            onClick={(e) => {
              e.preventDefault();
              window.sessionStorage.clear("editTaskId");
              setEditTask("hidden");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
