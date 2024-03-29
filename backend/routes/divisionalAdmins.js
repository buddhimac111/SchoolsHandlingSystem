const express = require("express");

const {
  DivisionalAdmin,
  validateDAdmin,
} = require("../models/divisionalAdmin");
const { dAdminAuth } = require("../middlewares/auth");

const router = express.Router();

// get logged admin details
router.get("/me", dAdminAuth, async (req, res) => {
  const id = req.user._id;

  const dAdmin = await DivisionalAdmin.findById(id).select("-__v");

  if (dAdmin) return res.send(dAdmin);
  res.status(404).send("User not found");
});
// get divisionalAdmin by id
router.get("/", dAdminAuth, async (req, res) => {
  const id = req.user._id;

  const divisionalAdmin = await DivisionalAdmin.findById(id).select("-__v");

  if (divisionalAdmin) return res.send(divisionalAdmin);
  res.status(404).send("User not found");
});

// update divisionalAdmin
router.put("/", dAdminAuth, async (req, res) => {
  const id = req.user._id;

  req.body._id = id;
  const errorDAdmin = validateDAdmin(req.body);
  if (errorDAdmin) return res.status(400).send(errorDAdmin);

  const dAdmin = await DivisionalAdmin.findOneAndUpdate(id, req.body, {
    new: true,
  }).select("-__v");
  if (dAdmin) return res.send(dAdmin);
  res.status(404).send("User not found");
});

module.exports = router;
