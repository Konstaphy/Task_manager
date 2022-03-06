import { pool } from "../db";

export class TasksController {
  async createTask(req: any, res: any) {
    const { text, user_id } = req.body;
    const newTask = await pool.query(
      `INSERT INTO tasks (message, description, completed, user_id) values ($1, $2, $3, $4) RETURNING *`,
      [text, "", false, user_id]
    );
    res.json(newTask);
  }
  async deleteTask(req: any, res: any) {
    const { task_id } = req.body;
    await pool.query(`DELETE FROM tasks WHERE task_id = $1`, [task_id]);
    res.json(`${task_id} has been deleted`);
  }
  async getTasksByUser(req: any, res: any) {
    const id = req.params.id;
    if (id === "0")
      return res.status(404).json({ error: "You are not authorised" });
    const task = await pool.query(`SELECT * from tasks where user_id = $1`, [
      id,
    ]);
    res.json(task.rows);
  }

  async getTaskById(req: any, res: any) {
    const { id } = req.body;
    const task = await pool.query(`SELECT * FROM tasks where task_id = $1`, [
      id,
    ]);
    res.json(task.rows[0]);
  }
}
