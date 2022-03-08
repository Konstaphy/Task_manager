import { pool } from "../db";
import { Request, Response } from "express";
import { ErrorHandler } from "../models/common/error";
import { Task, TaskDTO } from "../models/dtos/taskDTO";

export class TasksController {
  async createTask(req: Request, res: Response) {
    try {
      const { message, description, userId } = req.body;
      const newTask = await pool.query(
        `INSERT INTO tasks (message, description, completed, user_id) values ($1, $2, $3, $4) RETURNING *`,
        [message, description, false, userId]
      );
      if (!newTask.rows[0]) {
        return res.status(403).json("Something went wrong");
      }
      res.json(new TaskDTO(newTask.rows[0]));
    } catch (e) {
      res.status(500);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { task_id } = req.body;
      await pool.query(`DELETE FROM tasks WHERE task_id = $1`, [task_id]);
      res.json(`${task_id} has been deleted`);
    } catch (e) {
      res.status(500);
    }
  }
  async getTasksByUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (id === "0") return new ErrorHandler(403, "User doesn't exists");
      const task = await pool.query(`SELECT * from tasks where user_id = $1`, [
        id,
      ]);
      res.json(task.rows.map((task: Task) => new TaskDTO(task)));
    } catch (e) {
      res.status(500);
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (id === "0") return new ErrorHandler(403, "Task doesn't exists");
      const task = await pool.query(`SELECT * FROM tasks where task_id = $1`, [
        id,
      ]);
      if (!task.rows[0]) {
        return res.status(403).json("Task not found");
      }
      res.json(new TaskDTO(task.rows[0]));
    } catch (e) {
      res.status(200);
    }
  }
}
