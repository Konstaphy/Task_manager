const tokenLogic = require('./token.logic')

module.exports = function (req, res, next) {
    try{
        const authHeader = req.headers.Authorization
        if (!authHeader) {
            return res.json("Error unauth1")
        }
        const accessToken = authHeader.split(" ")[1]

        if (!accessToken) {
            return res.json("Error unauth2")
        }

        const userData = tokenLogic.validateAccToken(accessToken)

        if (!userData) {
            return res.json("Access token expired")
        }

        req.user = userData
        next()
    }catch (e) {
        console.log(e)
    }
}
