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
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tb_users");
};
