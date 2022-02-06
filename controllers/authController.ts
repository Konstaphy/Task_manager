import { AuthService } from "../services/authService";
import { pool } from "../db";

import validator from "validator";
import { TokenService } from "../services/tokenService";

const tokenService = new TokenService();

import "dotenv/config";

const authService = new AuthService();

export class AuthController {
  async registration(req: any, res: any, next: any) {
    try {
      const { username, email, password } = req.body;

      if (!validator.isEmail(email)) {
        return res.json({ Error: 400, Description: "Invalid email" });
      }
      if (validator.isEmpty(username) || username.length < 5) {
        return res.json({ Error: 400, Description: "Invalid username" });
      }
      if (validator.isEmpty(password) || password.length < 5) {
        return res.json({ Error: 400, Description: "Invalid password" });
      }

      const userData: any = await authService.registration(
        username,
        email,
        password
      );

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      next();

      return res.json(userData);
    } catch (e) {
      res.status(500).json("Error: " + e);
    }
  }

  async login(req: any, res: any, next: any) {
    try {
      const { username, password } = req.body;

      const userData: any = await authService.loginWithUsername(
        username,
        password
      );

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      next();

      return res.json(userData);
    } catch (e) {
      res.status(500);
    }
  }

  async logout(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.cookies;

      await pool.query(`DELETE FROM tokens where token = $1`, [refreshToken]);

      res.clearCookie("refreshToken");

      return res.json("Success");
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: any, res: any, next: any) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.json({ Error: 400, Description: "User unauthenticated" });
      }
      const accessToken = authHeader.split(" ")[1];

      const userIsValid = tokenService.validateAccToken(accessToken);

      if (!userIsValid) {
        return res.json({ Error: 401, Description: "Token expired" });
      }

      req.user = userIsValid;

      const { refreshToken } = req.cookies;

      const userData: any = await authService.refresh(refreshToken);

      if (!userData.Error) {
        res.cookie("refreshToken", userData.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      next();

      return res.json(userData);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
