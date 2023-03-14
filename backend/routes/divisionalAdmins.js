const express = require("express");
const mongoose = require("mongoose");

const {
  DivisionalAdmin,
  validateDAdmin,
} = require("../models/divisionalAdmin");

const router = express.Router();

// get all the divisionalAdmins
router.get("/", async (req, res) => {
  const divisionalAdmins = await DivisionalAdmin.find({});
  res.send(divisionalAdmins);
});

// get divisionalAdmin by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const divisionalAdmin = await DivisionalAdmin.findById(id);

  if (divisionalAdmin) return res.send(divisionalAdmin);
  res.status(404).send("User not found");
});

// update divisionalAdmin
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  req.body.user = id;
  const errorDAdmin = validateDAdmin(req.body);
  if (errorDAdmin) return res.status(400).send(errorDAdmin);

  const dAdmin = await DivisionalAdmin.findOneAndUpdate(id, req.body, {
    new: true,
  });
  if (dAdmin) return res.send(dAdmin);
  res.status(404).send("User not found");
});

module.exports = router;
