const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cp = require("cookie-parser");

const userRouter = require("./routes/user.routes");
const tasksRouter = require("./routes/task.routes");
const authRouter = require("./routes/auth.routes");


const app = express();
const PORT = 5000;

app.use(cors);
// app.use(express.json());
// app.use(cp());

app.get("/api", (req, res) => {
  res.json("HELLO")
})
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", tasksRouter);



const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (e) {
    throw Error('Something went wrong, ' + e)
  }
};

start().catch((e) => {
  console.log(e)
});
