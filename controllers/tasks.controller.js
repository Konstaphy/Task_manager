const db = require("../db");

class TasksController {
  async createTask(req, res) {
    const { text, date, completed, user_id } = req.body;
    const newTask = await db.query(
      `INSERT INTO tasks (text, date, completed, user_id) values ($1, $2, $3, $4) RETURNING *`,
      [text, date, completed, user_id]
    );
    res.json(newTask);
  }
  async getTaskByUser(req, res) {
    const id = req.params.id;
    const task = await db.query(`SELECT * from tasks where user_id = $1`, [id]);
    res.json(task);
  }
}

module.exports = new TasksController();
