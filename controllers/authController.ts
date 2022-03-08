import { AuthService } from "../services/authService";
import { pool } from "../db";
import validator from "validator";
import { TokenService } from "../services/tokenService";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { RefreshApiResponse } from "../models/http/refresh";
import { sendError } from "../utils/sendError";
import { Constants } from "../static/constants";
import { ErrorHandler } from "../models/common/error";

const authService = new AuthService();
const tokenService = new TokenService();

export class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!validator.isEmail(email)) {
        return res.json({ Error: 400, Description: "Invalid email" });
      }
      if (validator.isEmpty(name) || name.length < 5) {
        return res.json({ Error: 400, Description: "Invalid username" });
      }
      if (validator.isEmpty(password) || password.length < 5) {
        return res.json({ Error: 400, Description: "Invalid password" });
      }

      const userData = await authService.registration(name, email, password);

      if (userData instanceof ErrorHandler) {
        return res.status(500).json(userData.description);
      }
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, password } = req.body;

      const userData = await authService.loginWithUsername(name, password);

      if (userData instanceof ErrorHandler) {
        return res.status(505).json(userData.description);
      }

      res.cookie(Constants.CookieToken, userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      next();

      return res.json(userData);
    } catch (e) {
      res.status(500);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      await pool.query(`DELETE FROM tokens where refresh_token = $1`, [
        refreshToken,
      ]);

      res.clearCookie(Constants.CookieToken);

      return res.status(200);
    } catch (e) {
      res.status(500);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      const accessToken = authHeader?.split(" ")[1];

      if (!accessToken || accessToken === "undefined") {
        return res.status(401).json("User unauthenticated");
      }

      const userIsValid = tokenService.validateAccToken(accessToken);

      if (!userIsValid) {
        return res.status(401).json("User unauthenticated");
      }

      const { refreshToken } = req.cookies;

      const userData: any = await authService.refresh(refreshToken);

      if (!userData.Error) {
        res.cookie(Constants.CookieToken, userData.refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      }

      next();

      return res.json(userData);
    } catch (e) {
      res.status(500).json("huy");
    }
  }
}
