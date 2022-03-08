import { Response } from "express";
import { ErrorHandler } from "../models/common/error";

export const sendError = (error: ErrorHandler) => (res: Response) => {
  res.status(error.error).json({ message: error.description });
};
