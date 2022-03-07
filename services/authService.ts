import { pool } from "../db";
import userDTO, { UserFromDB } from "../dtos/userDTO";
import { TokenService } from "./tokenService";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";

const tokenService = new TokenService();

//TODO: деструктуризация
export class AuthService {
  async registration(name: string, email: string, password: string) {
    const candidate = await pool.query(
      `SELECT user_id FROM Users where (email = $1) OR (name = $2)`,
      [email, name]
    );
    if (candidate.rows.length !== 0)
      return { Error: 400, Description: "User already exists" };

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

  async login(user: QueryResult<UserFromDB>, password: string) {
    if (user.rows.length === 0) {
      return { Error: 400, Description: "User not found" };
    }

    const userPW = user.rows[0].password;

    const compared = await bcrypt.compare(password, userPW);

    if (!compared) {
      return { Error: 400, Description: "Invalid password" };
    }

    const userInstance = new userDTO(user.rows[0]);

    const tokens = tokenService.getToken({ ...userInstance });

    await tokenService.saveToken(userInstance.userId, tokens.refreshToken);

    return { ...tokens, user: userInstance };
  }

  async loginWithUsername(username: string, password: string) {
    const neededUser = await pool.query(`SELECT * FROM Users where name = $1`, [
      username,
    ]);
    return await this.login(neededUser, password);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      return { Error: 400, Description: "User unauthorised 1" };
    }

    const userData: any = await tokenService.validateRefToken(refreshToken);

    const token: string = await tokenService.findToken(refreshToken);

    if (!userData || !token) {
      return { Error: 400, Description: "User unauthorised 2" };
    }

    console.log(userData.user_id);

    const user = await pool.query(`SELECT * FROM Users where user_id = $1`, [
      userData.user_id,
    ]);

    console.log(user);

    const userIns = new userDTO(user.rows[0]);
    const tokens = tokenService.getToken({ ...userIns });

    await tokenService.saveToken(userIns.userId, tokens.refreshToken);
    return { ...tokens, user: userIns };
  }
}
