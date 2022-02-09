import express from "express";
import cors from "cors";
import cp from "cookie-parser";
import "dotenv/config";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes";
import * as http from "http";
import { setupWebSocket } from "./setupWebSocket";

const app = express();
const PORT = 5000;

const server = http.createServer(app);

setupWebSocket(server)

if (!process.env.DATABASE_USER){
  console.error("No .env file or database credentials are not included in it")
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cp());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", taskRouter);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
