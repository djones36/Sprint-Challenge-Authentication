const secrets = require("./secrets");
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken
};
function generateToken(user) {
  const payload = {
    username: user.username,
    subject: user.id
  };

  const options = {
    expiresIn: "30m"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
