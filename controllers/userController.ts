import { pool } from "../db";

export class UserController {
  async getUsers(req: any, res: any) {
    const users = await pool.query(`SELECT * FROM users ORDER BY user_id`);
    res.json(users.rows);
  }
  async getUser(req: any, res: any) {
    const id = req.params.id;
    const user = await pool.query(`SELECT * FROM users where user_id = $1`, [
      id,
    ]);
    res.json(user.rows[0]);
  }
  async deleteUser(req: any, res: any) {
    const id = req.params.id;
    await pool.query(`DELETE FROM tokens where user_id = $1`, [id]);
    await pool.query(`DELETE FROM tasks where user_id = $1`, [id]);
    await pool.query(`DELETE FROM users where user_id = $1`, [id]);
    res.status(200);
  }
  async updateUser(req: any, res: any) {
    const { id, username, email, password } = req.body;
    const user = await pool.query(
      `UPDATE users set username = $1, email = $2, password = $3 where user_id = $4 RETURNING *`,
      [username, email, password, id]
    );
    res.json(user.rows[0]);
  }
}
