const jwt = require('jsonwebtoken')

const db = require('../db')

class TokenLogic{
    getToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: "24h",
        }); // generating access jwt token
        const refreshToken = jwt.sign(payload, process.env.SECRETKEYREFRESH, {
            expiresIn: "24d",
        }); // generating refresh jwt token
        return {accessToken, refreshToken};
    }

    validateAccToken(token) {
        try {
            return jwt.verify(token, process.env.SECRETKEY)
        }catch (e) {
            return null
        }
    }

    validateRefToken(token) {
        try {
            return jwt.verify(token, process.env.SECRETKEYREFRESH)
        }catch (e) {
            return null
        }
    }

    async findToken (refreshToken){
        try {
            const tokenDB = await db.query(`SELECT * FROM tokens WHERE token = $1`, [refreshToken])
            return tokenDB.rows[0].token
        }catch (e) {
            throw new Error()
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await db.query(`select user_id from tokens where user_id = $1`, [user_id])
        // Checks if user has refresh token already

        if (tokenData.rows.length !== 0) {
            return await db.query(`update tokens set token = $1 where user_id = $2`, [refreshToken, user_id])
        } // Updating token if it's existing already

        return (
            await db.query(
                `insert into tokens (user_id, token) values ($1, $2) returning *`,
                [user_id, refreshToken]
            )
        ) // Creating token if it's not
    }
}

module.exports = new TokenLogic()