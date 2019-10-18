const db = require("../database/dbConfig");
module.exports = {
  find,
  findById,
  create
};

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
