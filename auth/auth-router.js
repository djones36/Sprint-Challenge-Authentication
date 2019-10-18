const router = require("express").Router();
const Users = require("./auth-model");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.create(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res
        .status(500)
        .json(errorRef(error), { message: "failed to create account" });
    });
});

router.post("/login", (req, res) => {
  // implement login
});

router.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.json({ loggedInUser: req.username, users });
    })
    .catch(error => {
      res.status(500).json({ message: "failed to display users", error });
    });
});

module.exports = router;
