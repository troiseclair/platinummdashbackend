/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tb_users", (table) => {
      table.string("id", 20).primary();
      table.string("name", 100);
      table.string("birth_date");
      table.string("gender", 20);
      table.string("phone", 20);
      table.string("email", 50);
      table.string("hire_date");
      table.string("position", 50);
      table.string("image");
    })
    .createTable("tb_user", (table) => {
      table.string("id", 20).primary();
      table.string("username", 50);
      table.string("password");
      table.timestamp("last_login").defaultTo(knex.fn.now(6));
      table.string("emp_id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tb_users");
};
