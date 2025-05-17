const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, country } = req.body;

    if (!username || !email || !password || !country) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (username.length < 5) {
      return res.status(400).json({ error: "Username must have 5 characters" });
    }

    if (password.length < 5) {
      return res.status(400).json({ error: "Password must have 5 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, country });
    await newUser.save();

    return res.status(200).json({ success: true, message: "Registered successfully" });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  
      sameSite: "Strict",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

    return res.status(200).json({ success: true, message: "Login successful" });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userDetails = async (req, res) => {
  try {
    const { user } = req;

    const userDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");

    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    const categorizedTasks = {
      yetToStart: [],
      inProgress: [],
      completed: [],
    };

    userDetails.tasks.forEach((task) => {
      if (task.status === "yetToStart") categorizedTasks.yetToStart.push(task);
      else if (task.status === "inProgress") categorizedTasks.inProgress.push(task);
      else categorizedTasks.completed.push(task);
    });

    return res.status(200).json({
      success: true,
      tasks: categorizedTasks,
      user: {
        username: userDetails.username,
        email: userDetails.email,
        country: userDetails.country,
      },
    });

  } catch (error) {
    console.error("User Details Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login, logout, userDetails };
