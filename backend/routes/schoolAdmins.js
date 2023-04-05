const express = require("express");

const { SchoolAdmin, validateSAdmin } = require("../models/schoolAdmin");
const { dAdminAuth, sAdminAuth } = require("../middlewares/auth");
const router = express.Router();

// get all the schoolAdmins
router.get("/", dAdminAuth, async (req, res) => {
  const schoolAdmins = await SchoolAdmin.find({});
  res.send(schoolAdmins);
});

// get logged admin details
router.get("/me", sAdminAuth, async (req, res) => {
  const id = req.user._id;

  const schoolAdmin = await SchoolAdmin.findById(id);

  if (schoolAdmin) return res.send(schoolAdmin);
  res.status(404).send("User not found");
});

// get schoolAdmin by id
router.get("/:id", dAdminAuth, async (req, res) => {
  const id = req.params.id;

  const schoolAdmin = await SchoolAdmin.findById(id);

  if (schoolAdmin) return res.send(schoolAdmin);
  res.status(404).send("User not found");
});

// update schoolAdmins own
router.put("/me", sAdminAuth, async (req, res) => {
  const id = req.user._id;
  req.body.school = req.user.school;

  req.body._id = id;
  const errorSAdmin = validateSAdmin(req.body);
  if (errorSAdmin) return res.status(400).send(errorSAdmin);

  const schoolAdmin = await SchoolAdmin.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (schoolAdmin) return res.send(schoolAdmin);
  res.status(404).send("User not found");
});

// update schoolAdmin not needed
router.put("/:id", dAdminAuth, async (req, res) => {
  const id = req.params.id;

  req.body._id = id;
  const errorSAdmin = validateSAdmin(req.body);
  if (errorSAdmin) return res.status(400).send(errorSAdmin);
  req.body.school = undefined;
  const schoolAdmin = await SchoolAdmin.findOneAndUpdate(id, req.body, {
    new: true,
  });
  if (schoolAdmin) return res.send(schoolAdmin);
  res.status(404).send("User not found");
});

module.exports = router;
