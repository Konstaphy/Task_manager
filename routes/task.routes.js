const Router = require("express");
const router = new Router();
const taskController = require("../controllers/tasks.controller.js");

router.post("/task", taskController.createTask);
router.get("/task/:id", taskController.getTaskByUser);

module.exports = router;
