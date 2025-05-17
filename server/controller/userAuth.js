const User = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const register = async (req, res) => {
   
  try {
    const { username, email, password, country } = req.body;
    console.log(username, email);
    if (!username || !email || !password || !country) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    if (username.length < 5) {
      return res.status(400).json({
        error: "Username must have 5 characters",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        error: "password must have 5 characters",
      });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        error: "User already exists! ",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashPassword,
        country,
      });
      await newUser.save();
       return res.status(200).json({
        success: "registered successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, data) => {
        if (data) {
          const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "10d",
            }
          );
           res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60,
          });
          return res.status(200).json({
            success: "Login successfully",
          });
        } else {
          return res.status(400).json({
            error: "Invalid credentials",
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "internal server error",
    });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    res.json({ message: "Logged Out" });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const userDetails = async (req, res) => {
  try {
    const { user } = req;
     const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");
      if(getDetails){
          const allTasks= getDetails.tasks ;
          let yetToStart = []
          let inProgress = [ ]
          let completed = [ ]
          allTasks.map((item) => {
            if(item.status === "yetToStart") {
              yetToStart.push(item)
            }else if( item.status === "inProgress") {
              inProgress.push(item)
            }else{
              completed.push(item)
            }
          })
          return res.status(200).json({
            success: "success" , tasks:[{yetToStart , inProgress , completed}]
          })
      }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
module.exports = { register, login, logout , userDetails };
