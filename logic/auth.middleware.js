const tokenLogic = require('./token.logic')

module.exports = function (req, res, next) {
    try{
        const authHeader = req.header.authorization
        if (!authHeader) {
            return res.json("Error unauth")
        }
        const accessToken = authHeader.split(" ")[1]

        if (!accessToken) {
            return res.json("Error unauth")
        }

        const userData = tokenLogic.validateAccToken(accessToken)

        if (!userData) {
            return res.json("Error unauth")
        }

        req.user = userData
        next()
    }catch (e) {
        console.log(e)
    }
}
