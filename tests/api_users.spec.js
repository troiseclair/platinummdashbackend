const request = require("supertest");
const app = require("../app");

describe("POST /users", () => {
  test("Return status 200 and users data", async () => {
    request(app)
      .post("/users")
      .send({
        name: "Sabrina Mawar",
        birthDate: "2000-02-02",
        gender: "Perempuan",
        phone: "8213456787",
        email: "sabrina@gmail.com",
        hireDate: "2024-06-06",
        position: "Admin",
        image: "/profile/sabrina.jpg",
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body.data).toHaveProperty([{ id }]);
        expect(res.body.data).toHaveProperty([{ name }]);
        expect(res.body.data).toHaveProperty([{ birth_date }]);
        expect(res.body.data).toHaveProperty([{ gender }]);
        expect(res.body.data).toHaveProperty([{ phone }]);
        expect(res.body.data).toHaveProperty([{ email }]);
        expect(res.body.data).toHaveProperty([{ hire_date }]);
        expect(res.body.data).toHaveProperty([{ position }]);
        expect(res.body.data).toHaveProperty([{ image }]);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toEqual("Berhasil Menambahkan Data Karyawan");
        expect(res.body.data.id).toEqual("emp_0001");
        expect(res.body.data.fullname).toEqual("Sabrina Mawar");
        expect(res.body.data.birthDate).toEqual("2000-02-02");
        expect(res.body.data.gender).toEqual("Perempuan");
        expect(res.body.data.phone).toEqual("8213456787");
        expect(res.body.data.email).toEqual("sabrina@gmail.com");
        expect(res.body.data.hireDate).toEqual("2024-06-06");
        expect(res.body.data.position).toEqual("Admin");
        expect(res.body.data.image).toEqual("/profile/sabrina.jpg");
      });
  });
});

describe("GET /users", () => {
  test("Return status 200 and users data", async () => {
    request(app)
      .get("/users")
      .then((res) => {
        // expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body.data[0]).toHaveProperty([{ id }]);
        expect(res.body.data[0]).toHaveProperty([{ name }]);
        expect(res.body.data[0]).toHaveProperty([{ birth_date }]);
        expect(res.body.data[0]).toHaveProperty([{ gender }]);
        expect(res.body.data[0]).toHaveProperty([{ phone }]);
        expect(res.body.data[0]).toHaveProperty([{ email }]);
        expect(res.body.data[0]).toHaveProperty([{ hire_date }]);
        expect(res.body.data[0]).toHaveProperty([{ position }]);
        expect(res.body.data[0]).toHaveProperty([{ image }]);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toEqual(
          "Behasil Mengambil Sumua Data Karyawan"
        );
        expect(res.body.data[0].id).toEqual("emp_0001");
        expect(res.body.data[0].name).toEqual("Sabrina Mawar");
        expect(res.body.data[0].birth_date).toEqual("2000-02-02");
        expect(res.body.data[0].gender).toEqual("Perempuan");
        expect(res.body.data[0].phone).toEqual("8213456787");
        expect(res.body.data[0].email).toEqual("sabrina@gmail.com");
        expect(res.body.data[0].hire_date).toEqual("2024-06-06");
        expect(res.body.data[0].position).toEqual("Admin");
        expect(res.body.data[0].image).toEqual("/profile/sabrina.jpg");
      });
  });
});

describe("DELETE /users/delete/:id", () => {
  const id = "emp_0001";
  test("Return status 200", async () => {
    request(app)
      .delete(`/users/delete/${id}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status");
        expect(res.body).toHaveProperty("message");
        expect(res.body.status).toBe(true);
        expect(res.body.message).toEqual(
          `Data Karyawan Dengan ID : ${id}, Berhasil Dihapus`
        );
      });
  });
});
