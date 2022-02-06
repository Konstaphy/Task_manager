const pg = require("../db");
const userDTO = require("../dtos/userDTO");
const tokenLogic = require("./tokenService");

const bcrypt = require("bcrypt");

class Service {
  // REGISTRATION
  async registration(username, email, password) {
    const candidate = await pg.query(
      `SELECT user_id FROM users where (email = $1) OR (username = $2)`,
      [email, username]
    );
    if (candidate.rows.length !== 0)
      return { Error: 400, Description: "User already exists" };
    // Checks if user with that email exists

    password = bcrypt.hashSync(password, 7);

    const newUser = await pg.query(
      `INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, `${password}`, "USER"]
    ); // Creating DB instance

    const userInstance = new userDTO(newUser.rows[0]); // Creating object as user pattern
    const tokens = tokenLogic.getToken({ ...userInstance }); // Getting JWT token with that information

    await tokenLogic.saveToken(userInstance.user_id, tokens.refreshToken); // Saving refresh token to DB

    return { ...tokens, user: userInstance };
  }

  // LOGIN
  async login(user, password) {
    if (user.rows.length === 0) {
      return { Error: 400, Description: "User not found" };
    }

    // getting hashed password
    const userPW = user.rows[0].password;

    // comparing passwords
    const compared = await bcrypt.compare(password, userPW);
    if (!compared) {
      return { Error: 400, Description: "Invalid password" };
    }

    // creating user model with dto pattern
    const userInstance = new userDTO(user.rows[0]);

    const tokens = tokenLogic.getToken({ ...userInstance }); // Getting JWT token with that information

    await tokenLogic.saveToken(userInstance.user_id, tokens.refreshToken); // Saving refresh token to DB

    return { ...tokens, user: userInstance };
  }

  async loginWithUsername(username, password) {
    // checking if there is user with that username in db
    const neededUser = await pg.query(
      `SELECT * FROM users where username = $1`,
      [username]
    );
    return await this.login(neededUser, password);
  }

  async loginWithEmail(email, password) {
    // checking if there is user with that email in db
    const neededUser = await pg.query(`SELECT * FROM users where email = $1`, [
      email,
    ]);
    return await this.login(neededUser, password);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      return { Error: 400, Description: "User unauthorised" };
    }

    // Validating jwt
    const userData = await tokenLogic.validateRefToken(refreshToken);

    // Finding token in db
    const token = await tokenLogic.findToken(refreshToken);

    // Validating if user is unauthorised
    if (!userData || !token) {
      return { Error: 400, Description: "User unauthorised" };
    }

    // Getting actual user data
    const user = await pg.query(`SELECT * FROM users where user_id = $1`, [
      userData.user_id,
    ]);

    // Creating instance using dto pattern
    const userIns = new userDTO(user.rows[0]);
    const tokens = tokenLogic.getToken({ ...userIns });

    await tokenLogic.saveToken(userIns.user_id, tokens.refreshToken);
    return { ...tokens, user: userIns };
  }
}

module.exports = new Service();
