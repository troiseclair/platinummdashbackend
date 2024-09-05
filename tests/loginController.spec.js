const db = require("../lib/db");
const bcrypt = require("bcrypt");
const secret =
  "!DV@eW81H;M7)Cb?#w2&vPk_-Y#y#Cg8MfdU*4&ZTqR-y#ge1{qU,F&b4GN2:PQW";
const jwt = require("jsonwebtoken");
const loginController = require("../controllers/loginController");

const mockRequest = (body = {}, params = {}, query = {}) => {
  return {
    body: body,
    params: params,
    query: query,
  };
};

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe("Login Controller postLogin Function, If Username & Password Correct", () => {
  test('res.json called with { status: true, message: "Username dan Password Benar"}', async () => {
    const req = mockRequest({
      username: "mas7271",
      password: "admin123",
    });
    const res = mockResponse();
    await loginController.postLogin(req, res);
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
      .where({ "tb_user.username": req.body.username })
      .first();
    /* create token */
    const accessToken = jwt.sign(
      {
        id: getUser.id,
        fullname: getUser.name,
        username: getUser.username,
        position: getUser.position,
      },
      secret,
      { expiresIn: "1d" }
    );

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: true,
      message: "Username dan Password Benar",
      userId: getUser.id,
      username: getUser.username,
      fullname: getUser.name,
      position: getUser.position,
      accessToken: accessToken,
    });
  });
});

describe("Login Controller postLogin Function, If Username False", () => {
  test('res.json called with { status: false, message: "Username Tidak Ditemukan"}', async () => {
    const req = mockRequest({
      username: "dasdasd",
      password: "dasdas",
    });
    const res = mockResponse();
    await loginController.postLogin(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "Username Tidak Ditemukan",
    });
  });
});

describe("Login Controller postLogin Function, If Password False", () => {
  test('res.json called with { status: false, message: "Username Salah"}', async () => {
    const req = mockRequest({
      username: "mas7271",
      password: "dasdas",
    });
    const res = mockResponse();
    await loginController.postLogin(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: false,
      message: "Password Tidak Sesuai",
    });
  });
});