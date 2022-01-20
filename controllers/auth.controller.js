const authLogic = require('../logic/auth.logic')
const pg = require('../db')

const validator = require('validator')

require("dotenv").config();

class Controller {
  async registration(req, res, next) {
    try{
      const { username, email, password } = req.body; // Getting user parameters

      // Validating information
      if (!validator.isEmail(email)) {
        return res.json({Error: 400, Description: "Invalid email"})
      }
      if (validator.isEmpty(username) || username.length < 5) {
        return res.json({Error: 400, Description: "Invalid username"})
      }
      if (validator.isEmpty(password) || password.length < 5) {
        return res.json({Error: 400, Description: "Invalid password"})
      }

      const userData = await authLogic.registration(username, email, password) // Register user to DB

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      next() // Callback

      res.json(userData);

    }catch (e) {
      res.status(500).json('Error: ' + e)
    }

  }

  async login(req, res, next) {
    try {
      // Get information about user

      console.log('logged')
      const {username, password} = req.body

      console.log('logged')
      const userData = await authLogic.loginWithUsername(username, password)
      console.log('logged')
      // Caching refreshToken
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      // Callback
      next()

      console.log('logged')
      // Returning tokens and data on client
      res.json(userData);

    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }

  // Logout
  async logout(req, res, next) {
    try{
      // Initialising id of wanting to logout user
      const {refreshToken} = req.cookies

      // Deleting token of that user
      const deletedToken = await pg.query(`DELETE FROM tokens where token = $1`, [refreshToken])

      // Deleting cookie
      res.clearCookie('refreshToken')

      // Callback
      next()

      res.json(deletedToken)

    }catch (e) {
      res.json({"Error": e})
    }
  }

  // Refresh token
  async refresh (req, res, next) {
      try{

        console.log('huy1')
        // Getting current refresh cookie
        const {refreshToken} = req.cookies

        // Generating new token
        const userData = await authLogic.refresh(refreshToken)
        // return res.json(userData)
        // Cooking new refresh token
        res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})

        // Callback
        next()

        //Sending response
        return res.json(userData)

      } catch (e) {
        res.status(500).json(e)
      }
  }
}

module.exports = new Controller();
