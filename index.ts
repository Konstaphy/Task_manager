import express from "express";
import "dotenv/config";
import cors from "cors";
import cp from "cookie-parser";

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes";

const app = express();
const PORT = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cp());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", taskRouter);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
