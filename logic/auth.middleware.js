const tokenLogic = require('./token.logic')

module.exports = function (req, res, next) {
    try{
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.json({Error: 400, Description: 'User unauthenticated'})
        }
        const accessToken = authHeader.split(" ")[1]

        const userData = tokenLogic.validateAccToken(accessToken)

        if (!userData) {
            return res.json({Error: 401, Description: 'Token expired'})
        }

        req.user = userData
        next()
    }catch (e) {
        console.log(e)
    }
}
