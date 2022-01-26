const Router = require("express");
const router = new Router();
const controller = require("../controllers/auth.controller");
const mw = require('../logic/auth.middleware')

router.get('/refresh', mw, controller.refresh)
router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.post("/logout", controller.logout);


module.exports = router;
 
