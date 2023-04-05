const express = require("express");
const { User } = require("../models/user");
const { validPassword } = require("../utils/hash");
const getUser = require("../utils/getUser");

const router = express.Router();

router.get("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select("-__v");
  if (!user) return res.status(400).send("Incorrect Email Address");

  const isValidPassword = await validPassword(password, user.password);
  if (!isValidPassword) return res.status(400).send("Invalid Password");

  user.password = undefined;

  const other = await getUser(user._id, user.role);
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({ ...user._doc, ...other._doc });
});

module.exports = router;
