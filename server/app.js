const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectDb } = require("./config/connectDb");
app.use(express.json());
app.use(cookieParser());
const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute")
const PORT = process.env.PORT || 4040;
connectDb();
app.use(cors({ origin: ["http://localhost:5173"] , credentials: true, }));
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);
 
app.listen(PORT, () => {
  console.log("server started : " + PORT);
});
