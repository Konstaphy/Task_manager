const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cp = require("cookie-parser");
const path = require("path");

const multer = require('multer')



const userRouter = require("./routes/user.routes");
const tasksRouter = require("./routes/task.routes");
const imageRouter = require("./routes/image.routes");
const authRouter = require("./routes/auth.routes");


const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cp());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use("/api", userRouter);
app.use("/api", tasksRouter);
app.use("/api", imageRouter);
app.use("/api", authRouter);


const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (e) {
    throw Error('Something went wrong, ' + e)
  }
};

start().catch();
