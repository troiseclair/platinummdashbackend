var express = require("express");
var router = express.Router();

const loginController = require("../controllers/loginController");
/* import middleware */
const restrict = require("../middlewares/restrict");

router.post("/login", loginController.postLogin);
router.get("/dashboard", restrict, loginController.getDashboard);

module.exports = router;
