const Router = require("express");
const router = new Router();
const taskController = require("../controllers/tasksController.js");

router.post("/createTask", taskController.createTask);
router.post("/deleteTask", taskController.deleteTask);
router.post("/getTask", taskController.getTaskById);
router.get("/tasks/:id", taskController.getTasksByUser);

module.exports = router;
