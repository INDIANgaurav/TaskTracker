import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import axios from "axios";
import EditTask from "../components/Dashboard/EditTask";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("hidden");
  const [tasks, setTasks] = useState();
  const [editTask, setEditTask] = useState("hidden");
  const [editTaskId, setEditTaskId] = useState();

  // Track which tab is active
  const [activeTab, setActiveTab] = useState("yetToStart");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:4040/api/v1/userDetails", {
          withCredentials: true,
        });
        setTasks(res.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();

    if (window.sessionStorage.getItem("editTaskId")) {
      setEditTask("block");
      setEditTaskId(window.sessionStorage.getItem("editTaskId"));
    }
  }, [addTaskDiv]);

  return (
    <div className="w-full relative min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white">
        <Header setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row px-4 md:px-12 py-4 gap-4 md:gap-12 flex-grow bg-zinc-100">
        {/* Sidebar with tabs */}
        <div className="flex md:flex-col justify-around md:justify-start gap-2 md:gap-4 bg-white p-2 md:w-1/4 rounded shadow">
          <button
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === "yetToStart" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("yetToStart")}
          >
            Yet To Start
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === "inProgress" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("inProgress")}
          >
            In Progress
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 bg-white p-6 rounded shadow min-h-[60vh] overflow-auto">
          {tasks ? (
            <>
              {activeTab === "yetToStart" && <YetToStart task={tasks[0]?.yetToStart} />}
              {activeTab === "inProgress" && <InProgress task={tasks[0]?.inProgress} />}
              {activeTab === "completed" && <Completed task={tasks[0]?.completed} />}
            </>
          ) : (
            <p className="text-center text-gray-500">Loading tasks...</p>
          )}
        </div>
      </div>

      {/* Overlay for Add Task */}
      <div
        className={`${addTaskDiv} fixed top-0 left-0 w-full h-screen bg-zinc-800 opacity-85 z-40`}
      ></div>
      <div
        className={`${addTaskDiv} fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50`}
      >
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Overlay for Edit Task */}
      <div
        className={`${editTask} fixed top-0 left-0 w-full h-screen bg-zinc-800 opacity-85 z-40`}
      ></div>
      <div
        className={`${editTask} fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50`}
      >
        <EditTask editTaskId={editTaskId} setEditTask={setEditTask} />
      </div>
    </div>
  );
};

export default Dashboard;
