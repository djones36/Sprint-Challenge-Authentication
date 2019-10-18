const db = require("../database/dbConfig");
module.exports = {
  find,
  findById,
  create,
  findBy
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

function create(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      cosnt[id] = ids;
      return findById(id);
    });
}

function findBy(filter) {
  return db("users").where(filter);
}
