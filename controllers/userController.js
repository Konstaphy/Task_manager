const db = require("../db");

class Controller {
  async getUsers(req, res) {
    const users = await db.query(`SELECT * FROM users ORDER BY user_id`);
    res.json(users.rows);
  }
  async getUser(req, res) {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM users where user_id = $1`, [id]);
    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    await db.query(`DELETE FROM tokens where user_id = $1`, [id]);
    await db.query(`DELETE FROM tasks where user_id = $1`, [id]);
    await db.query(`DELETE FROM users where user_id = $1`, [id]);
    res.status(200);
  }
  async updateUser(req, res) {
    const { id, username, email, password } = req.body;
    const user = await db.query(
      `UPDATE users set username = $1, email = $2, password = $3 where user_id = $4 RETURNING *`,
      [username, email, password, id]
    );
    res.json(user.rows[0]);
  }
  async getIdFromJWT(req, res) {

  }
}

module.exports = new Controller();
