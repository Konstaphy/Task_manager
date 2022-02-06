const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");

router.get("/refresh", controller.refresh);
router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;
