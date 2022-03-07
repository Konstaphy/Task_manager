import { pool } from "../db";
import { Request, Response } from "express";
import { UserFromDB } from "../models/userDTO";
import { QueryResult } from "pg";
import { sendError } from "../utils/sendError";
import { ErrorHandler } from "../models/error";

export class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const users: QueryResult<UserFromDB> = await pool.query(
        `SELECT * FROM users ORDER BY user_id`
      );
      res.json(users.rows);
    } catch (e) {
      res.status(500);
    }
  }
  async getUser(req: any, res: any) {
    try {
      const id = req.params.id;
      if (!id) sendError(new ErrorHandler(403, "User doesn't exists"));
      const user = await pool.query(`SELECT * FROM users where user_id = $1`, [
        id,
      ]);
      res.json(user.rows[0]);
    } catch {
      res.status(500);
    }
  }
  async deleteUser(req: any, res: any) {
    try {
      const id = req.params.id;
      await pool.query(`DELETE FROM tokens where user_id = $1`, [id]);
      await pool.query(`DELETE FROM tasks where user_id = $1`, [id]);
      await pool.query(`DELETE FROM users where user_id = $1`, [id]);
      res.status(200);
    } catch (e) {
      res.status(500);
    }
  }
  async updateUser(req: any, res: any) {
    try {
      const { id, username, email, password } = req.body;
      if (!id || !username || !email || !password)
        sendError(new ErrorHandler(403, "Data is invalid"));
      const user = await pool.query(
        `UPDATE users set name = $1, email = $2, password = $3 where user_id = $4 RETURNING *`,
        [username, email, password, id]
      );
      res.json(user.rows[0]);
    } catch (e) {
      res.status(500);
    }
  }
}
