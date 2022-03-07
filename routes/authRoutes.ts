import express from "express";
const authRouter = express.Router();
import { AuthController } from "../controllers/authController";
const controller = new AuthController();

authRouter.get("/refresh", controller.refresh);
authRouter.post("/signUp", controller.signUp);
authRouter.post("/login", controller.login);
authRouter.post("/logout", controller.logout);

export default authRouter;
