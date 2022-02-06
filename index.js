const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cp = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const tasksRouter = require("./routes/taskRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();
const PORT = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cp());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", tasksRouter);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
