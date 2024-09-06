const db = require("../lib/db");
const bcrypt = require("bcrypt");
const secret =
  "!DV@eW81H;M7)Cb?#w2&vPk_-Y#y#Cg8MfdU*4&ZTqR-y#ge1{qU,F&b4GN2:PQW";
const jwt = require("jsonwebtoken");

/* POST /login */
const postLogin = async (req, res) => {
  /* get user input */
  const { username, password } = req.body;
  /* get user data from table user */
  const getUser = await db("tb_user")
    .join("tb_users", "tb_user.emp_id", "=", "tb_users.id")
    .select(
      "tb_user.id",
      "tb_user.username",
      "tb_user.password",
      "tb_users.name",
      "tb_users.position",
      "tb_user.last_login"
    )
    .where({ "tb_user.username": username })
    .first();
  // console.log("post login getUser", getUser);

  /* check username password */
  if (getUser !== undefined) {
    /* if username true, check password */
    let isMatch = await bcrypt.compare(password, getUser.password);
    if (isMatch) {
      const getId = getUser.id;
      const getUsername = getUser.username;
      const getName = getUser.name;
      const getPosition = getUser.position;
      /* Get date now */
      const date = new Date();
      const getDate = date.toLocaleString();
      /* Update last_login */
      await db("tb_user").update({ last_login: getDate }).where({ id: getId });
      /* create token */
      const accessToken = jwt.sign(
        {
          id: getId,
          fullname: getUser.name,
          username: getUsername,
          position: getPosition,
        },
        secret,
        { expiresIn: "1d" }
      );
      /* if password input true */
      return res.status(200).json({
        status: true,
        message: "Username dan Password Benar",
        userId: getId,
        username: getUsername,
        fullname: getName,
        position: getPosition,
        accessToken: accessToken,
      });
    } else {
      /* if password false */
      return res.status(200).json({
        status: false,
        message: "Password Tidak Sesuai",
      });
    }
  } else {
    /* if username false */
    return res.status(200).json({
      status: false,
      message: "Username Tidak Ditemukan",
    });
  }
};

/* GET /dashboard */
const getDashboard = async (req, res) => {
  /* get user login */
  console.log("dashboard req", req.user);
  const userId = req.user.id;
  const fullname = req.user.name;
  const firstName = fullname.split(" ").at(0);
  const user = await db("tb_user")
    .join("tb_users", "tb_user.emp_id", "=", "tb_users.id")
    .select(
      "tb_user.id",
      "tb_user.username",
      "tb_users.name",
      "tb_users.position",
      "tb_user.last_login"
    )
    .where({ "tb_user.id": userId })
    .first();
  /* get total product from tb_product */
  const getTotalProduct = await db("tb_product").count("id").first();
  /* get total sales from table sale history */
  const getTotalSale = await db("tb_sale_history").sum("qty").first();
  /* get total income from table sale history */
  const getTotalIncome = await db("tb_sale_history").sum("total").first();

  res.status(200).json({
    name: firstName,
    product: getTotalProduct.count,
    sale: getTotalSale.sum,
    income: getTotalIncome.sum,
    dataUser: user,
  });
};

module.exports = { postLogin, getDashboard };
