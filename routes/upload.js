var express = require("express");
var router = express.Router();

const uploadController = require("../controllers/uploadController");

router.post("/", uploadController.uploadImage);

module.exports = router;
