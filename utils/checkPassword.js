require("dotenv").config();

function checkPassword(req, res, next) {
  const password = req.body.adminPassword;
  if (password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).send("Unauthorized: Invalid password");
  }
}

module.exports = checkPassword;
