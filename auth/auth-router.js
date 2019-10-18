const router = require("express").Router();
const Users = require("./auth-model");
const bcrypt = require("bcryptjs");
const gt = require("../database/generateToken");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      const token = gt.generateToken(newUser);
      res.status(201).json({
        message: `successfully registered as ${newUser.username}`,
        token
      });
    })
    .catch(error => {
      res.status(500).json({ message: "failed to create account", error });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //produce token
        const token = gt.generateToken(user);

        //add token to response
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "failed to login account" });
    });
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
