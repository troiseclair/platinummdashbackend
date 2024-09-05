var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multer = require("multer");
const cors = require("cors");
const passport = require("./lib/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var uploadRouter = require("./routes/upload");

var app = express();

/* setup cors */
app.use(cors());
let whiteList = ["http://52.221.24.81:3000", "https://httpbin.org/post"];
let corsOption = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != 1) {
      callback(null, true);
    } else {
      callback(new Error("Server tidak diizinkan akses oleh CORS"));
    }
  },
};

/* setup multer */
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Only .png .jpg .jpeg format allowed!"));
    }
  },
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", usersRouter);
app.use("/upload", upload.single("file"), cors(corsOption), uploadRouter);

module.exports = app;
