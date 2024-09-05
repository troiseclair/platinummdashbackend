const request = require("supertest");
const app = require("../app");

describe("POST /login", () => {
  test("Return status 200 and login data", async () => {
    await request(app)
      .post("/login")
      .send({ username: "jane4185", password: "admin123" })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("userId");
        expect(res.body).toHaveProperty("username");
        expect(res.body).toHaveProperty("fullname");
        expect(res.body).toHaveProperty("position");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toEqual("Username dan Password Benar");
        expect(res.body.userId).toEqual("user_0003");
        expect(res.body.username).toEqual("jane4185");
        expect(res.body.fullname).toEqual("Jane Doe");
        expect(res.body.position).toEqual("Kasir");
      });
  });
});

describe("GET /dashboard", () => {
  test("Return Status 200 and res.json", async () => {
    request(app)
      .get("/dashboard")
      .then((res) => {
        // expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("product");
        expect(res.body).toHaveProperty("sale");
        expect(res.body).toHaveProperty("income");
        expect(res.body).toHaveProperty("dataUser");
        expect(res.body.name).toEqual("Sabrina");
        expect(res.body.product).toEqual("25");
        expect(res.body.sale).toEqual("125");
        expect(res.body.income).toEqual("500000");
        expect(res.body.dataUser.userId).toEqual("user_0001");
        expect(res.body.dataUser.username).toEqual("sabrina123");
        expect(res.body.dataUser.fullname).toEqual("Sabrina Mawar");
        expect(res.body.dataUser.position).toEqual("Admin");
      });
  });
});
