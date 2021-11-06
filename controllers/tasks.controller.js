const db = require("../db");

class TasksController {
  async createTask(req, res) {
    const { text, date, user_id } = req.body;
    const newTask = await db.query(
      `INSERT INTO tasks (text, date, completed, user_id) values ($1, $2, $3, $4) RETURNING *`,
      [text, date, false, user_id]
    );
    res.json(newTask);
  }
  async deleteTask(req, res) {
    const { task_id } = req.body;
    await db.query(
        `DELETE FROM tasks WHERE task_id = $1`, [task_id]
    );
    res.json(`${task_id} has been deleted`);
  }
  async getTasksByUser(req, res) {
    const id = req.params.id;
    if (id === '0') return res.status(404).json({'error': 'You are not authorised'})
    const task = await db.query(`SELECT * from tasks where user_id = $1`, [id]);
    res.json(task.rows);
  }

  async getTaskById(req, res) {
    const {id} = req.body
    const task = await db.query(`SELECT * FROM tasks where task_id = $1`, [id]);
    res.json(task.rows[0])
  }
}

module.exports = new TasksController();
