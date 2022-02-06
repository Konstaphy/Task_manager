import express from "express";
const taskRouter = express.Router();
import { TasksController } from "../controllers/tasksController";
const controller = new TasksController();

taskRouter.post("/createTask", controller.createTask);
taskRouter.post("/deleteTask", controller.deleteTask);
taskRouter.post("/getTask", controller.getTaskById);
taskRouter.get("/tasks/:id", controller.getTasksByUser);

export default taskRouter;
