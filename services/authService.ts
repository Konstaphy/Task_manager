import { pool } from "../db";
import userDTO, { UserFromDB } from "../models/dtos/userDTO";
import { TokenService } from "./tokenService";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";
import { ErrorHandler } from "../models/common/error";
import { RefreshApiResponse } from "../models/http/refresh";

const tokenService = new TokenService();

export class AuthService {
  async registration(name: string, email: string, password: string) {
    const candidate = await pool.query(
      `SELECT user_id FROM Users where (email = $1) OR (name = $2)`,
      [email, name]
    );
    if (candidate.rows.length !== 0) {
      return new ErrorHandler(403, "User already exists");
    }

    password = bcrypt.hashSync(password, 7);

    const newUser = await pool.query(
      `INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );

    const userInstance = new userDTO(newUser.rows[0]);
    const tokens = tokenService.getToken({ ...userInstance });

    await tokenService.saveToken(userInstance.userId, tokens.refreshToken);

    return { ...tokens, user: userInstance };
  }

  async login(
    user: QueryResult<UserFromDB>,
    password: string
  ): Promise<RefreshApiResponse | ErrorHandler> {
    if (user.rows.length === 0) {
      return new ErrorHandler(403, "User not found");
    }

    const userPW = user.rows[0].password;

    const compared = await bcrypt.compare(password, userPW);

    if (!compared) {
      return new ErrorHandler(403, "Invalid password");
    }

    const userInstance = new userDTO(user.rows[0]);

    const tokens = tokenService.getToken({ ...userInstance });

    await tokenService.saveToken(userInstance.userId, tokens.refreshToken);

    return { ...tokens, user: userInstance };
  }

  async loginWithUsername(
    username: string,
    password: string
  ): Promise<RefreshApiResponse | ErrorHandler> {
    const neededUser = await pool.query(`SELECT * FROM Users where name = $1`, [
      username,
    ]);
    return await this.login(neededUser, password);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      return new ErrorHandler(403, "User unauthenticated");
    }

    const userData: any = await tokenService.validateRefToken(refreshToken);

    const token: string = await tokenService.findToken(refreshToken);

    if (!userData || !token) {
      return new ErrorHandler(403, "User unauthenticated");
    }

    const user = await pool.query(`SELECT * FROM Users where user_id = $1`, [
      userData.userId,
    ]);

    const userIns = new userDTO(user.rows[0]);
    const tokens = tokenService.getToken({ ...userIns });

    await tokenService.saveToken(userIns.userId, tokens.refreshToken);
    return { ...tokens, user: userIns };
  }
}
