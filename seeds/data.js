/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tb_users").del();
  // insert users data
  await knex("tb_users").insert([
    {
      id: "emp_0001",
      name: "Admin",
      birth_date: "2000-01-01",
      gender: "Laki-laki",
      phone: "81231231231",
      email: "admin@petitemart.com",
      hire_date: "2000-01-01",
      position: "Admin",
      image:
        "https://res.cloudinary.com/dydjwts7v/image/upload/c_thumb,w_200,g_face/v1724313771/blank-profile-picture-973460_640_cbftdd.png",
    },
  ]);
  // insert user data
  await knex("tb_user").insert([
    {
      id: "user_0001",
      username: "admin999",
      password: "$2b$10$QmtrHfIqTEoRK8t7Ti04TeoOGayW7dPHsXWnVfJ0gVtfjjhwRJJT.",
      last_login: "2024-08-31 16:38:47.574928+07",
      emp_id: "emp_0001",
    },
  ]);
};
