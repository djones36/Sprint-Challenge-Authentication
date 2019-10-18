const router = require("express").Router();
const Users = require("./auth-model");

router.post("/register", (req, res) => {
  // implement registration
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
