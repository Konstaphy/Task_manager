import express from "express";
const userRouter = express.Router();
import { UserController } from "../controllers/userController";
const controller = new UserController();

userRouter.get("/user", controller.getUsers);
userRouter.get("/user/:id", controller.getUser);
userRouter.put("/user", controller.updateUser);
userRouter.delete("/user/:id", controller.deleteUser);

export default userRouter;
