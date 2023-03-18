const express = require("express");
const mongoose = require("mongoose");

const {
  DivisionalAdmin,
  validateDAdmin,
} = require("../models/divisionalAdmin");
const { dAdminAuth } = require("../middlewares/auth");

const router = express.Router();

// get divisionalAdmin by id
router.get("/", dAdminAuth, async (req, res) => {
  const id = req.user._id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const divisionalAdmin = await DivisionalAdmin.findOne({ user: id }).select(
    "-__v -_id"
  );

  if (divisionalAdmin) return res.send(divisionalAdmin);
  res.status(404).send("User not found");
});

// update divisionalAdmin
router.put("/", dAdminAuth, async (req, res) => {
  const id = req.user._id;

  req.body.user = id;
  const errorDAdmin = validateDAdmin(req.body);
  if (errorDAdmin) return res.status(400).send(errorDAdmin);

  const dAdmin = await DivisionalAdmin.findOneAndUpdate(id, req.body, {
    new: true,
  }).select("-__v -_id");
  if (dAdmin) return res.send(dAdmin);
  res.status(404).send("User not found");
});

module.exports = router;
