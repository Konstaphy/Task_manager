import jwt from "jsonwebtoken";
import "dotenv/config";
import { pool } from "../db";

//TODO: types
export class TokenService {
  getToken(payload: any) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY ?? "", {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.SECRET_KEY_REFRESH ?? "",
      {
        expiresIn: "31d",
      }
    );
    return { accessToken, refreshToken };
  }

  validateAccToken(token: string) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY ?? "");
    } catch (e) {
      return null;
    }
  }

  validateRefToken(token: string) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY_REFRESH ?? "");
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    try {
      const tokenDB = await pool.query(
        `SELECT * FROM tokens WHERE refresh_token = $1`,
        [refreshToken]
      );
      return tokenDB.rows[0].refresh_token;
    } catch (e) {
      throw new Error();
    }
  }

  async saveToken(user_id: number, refreshToken: string) {
    const tokenData = await pool.query(
      `select user_id from Tokens where user_id = $1`,
      [user_id]
    );

    if (tokenData.rows.length !== 0) {
      return await pool.query(
        `update Tokens set refresh_token = $1 where user_id = $2`,
        [refreshToken, user_id]
      );
    }

    return await pool.query(
      `insert into tokens (user_id, refresh_token) values ($1, $2) returning *`,
      [user_id, refreshToken]
    );
  }
}
