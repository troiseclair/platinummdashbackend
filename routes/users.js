var express = require("express");
var router = express.Router();

/* import users controller */
const usersController = require("../controllers/usersController");

/* import middleware */
const restrict = require("../middlewares/restrict");

/* users Controller Router */
router.post("/", usersController.postusers);
router.get("/", restrict, usersController.getusers);
router.get("/:id", restrict, usersController.getusersId);
router.put("/update/:id", usersController.updateusers);
router.delete("/delete/:id", usersController.deleteusersId);

module.exports = router;
