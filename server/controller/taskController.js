const Task = require("../models/tasks.js");
const addTask = async (req, res) => {
  try {
    const { project, title, description, priority, status } = req.body;
    const { user } = req;
    if (!project || !title || !description) {
      return res.status(400).json({
        error: "All fields required",
      });
    }
    if (project.length < 6) {
      return res.status(400).json({
        error: "project must have 6 characters",
      });
    }
    if (title.length < 6) {
      return res.status(400).json({
        error: "title must have 6 characters",
      });
    }
    if (description.length < 6) {
      return res.status(400).json({
        error: "description must have 6 characters",
      });
    }

    const newTask = new Task({ project, title, description, priority, status });
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();
    return res.status(200).json({
      success: "Task added",
      newTask,
    });
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { project, title, description, priority, status } = req.body;

    if (!project || !title || !description) {
      return res.status(400).json({
        error: "All fields required",
      });
    }
    if (project.length < 2) {
      return res.status(400).json({
        error: "project must have 6 characters",
      });
    }
    if (title.length < 4) {
      return res.status(400).json({
        error: "title must have 6 characters",
      });
    }
    if (description.length < 6) {
      return res.status(400).json({
        error: "description must have 6 characters",
      });
    }
    await Task.findByIdAndUpdate(id, {
      project,
      title,
      description,
      priority,
      status,
    });
    return res.status(200).json({
      success: "Task updated",
    });
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const taskDetails = await Task.findById(id);
    return res.status(200).json({
      taskDetails,
    });
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    return res.status(200).json({
      success: "Task deleted",
    });
  } catch (error) {
    return res.status(404).json({ error: "Internal server error" });
  }
};

module.exports = { getTask, deleteTask, editTask, addTask };
