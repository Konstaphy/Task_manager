const authLogic = require("../logic/auth.logic");
const pg = require("../db");

const validator = require("validator");
const tokenLogic = require("../logic/token.logic");

require("dotenv").config();

class Controller {
  async registration(req, res, next) {
    try {
      const { username, email, password } = req.body; // Getting user parameters

      // Validating information
      if (!validator.isEmail(email)) {
        return res.json({ Error: 400, Description: "Invalid email" });
      }
      if (validator.isEmpty(username) || username.length < 5) {
        return res.json({ Error: 400, Description: "Invalid username" });
      }
      if (validator.isEmpty(password) || password.length < 5) {
        return res.json({ Error: 400, Description: "Invalid password" });
      }

      const userData = await authLogic.registration(username, email, password); // Register user to DB

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      next(); // Callback

      res.json(userData);
    } catch (e) {
      res.status(500).json("Error: " + e);
    }
  }

  async login(req, res, next) {
    // res.json()
    try {
      // Get information about user
      const { username, password } = req.body;

      const userData = await authLogic.loginWithUsername(username, password);
      // Caching refreshToken
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Callback
      next();

      // Returning tokens and data to client
      res.json(userData);
    } catch (e) {
      res.status(500);
    }
  }

  // Logout
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      await pg.query(`DELETE FROM tokens where token = $1`, [refreshToken]);

      res.clearCookie("refreshToken");

      return res.json("Success");
    } catch (e) {
      next(e);
    }
  }

  // Refresh token
  async refresh(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.json({ Error: 400, Description: "User unauthenticated" });
      }
      const accessToken = authHeader.split(" ")[1];

      const userIsValid = tokenLogic.validateAccToken(accessToken);

      if (!userIsValid) {
        return res.json({ Error: 401, Description: "Token expired" });
      }

      req.user = userIsValid;

      const { refreshToken } = req.cookies;

      const userData = await authLogic.refresh(refreshToken);

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

module.exports = new Controller();
