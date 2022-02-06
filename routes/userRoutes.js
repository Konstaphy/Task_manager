const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController.js");

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getUser);
router.post("/user", userController.getIdFromJWT);
router.put("/user", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
