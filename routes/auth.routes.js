const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth.controller");
const mw = require('../logic/auth.middleware')

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get('/refresh', mw, controller.refresh)

module.exports = router;
 
