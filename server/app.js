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
app.use(cors({ origin: ["https://task-tracker-sigma-opal.vercel.app"] , credentials: true, }));
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.listen(PORT, () => {
  console.log("server started : " + PORT);
});
