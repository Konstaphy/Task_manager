const Router = require("express");
const router = new Router();
const taskController = require("../controllers/tasks.controller.js");

router.post("/createTask", taskController.createTask);
router.post("/getTask", taskController.getTaskById)
router.get("/tasks/:id", taskController.getTasksByUser);

module.exports = router;
