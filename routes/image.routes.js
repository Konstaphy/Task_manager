const Router = require("express");
const router = new Router();
const imageController = require("../controllers/image.controller");

router.post("/image", imageController.postImage);
router.get("/image/:id", imageController.getPersonImages);

module.exports = router;
