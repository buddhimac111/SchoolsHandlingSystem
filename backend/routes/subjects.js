const express = require("express");
const mongoose = require("mongoose");
const { dAdminAuth, auth } = require("../middlewares/auth");

const { Subject, validateSubject } = require("../models/subject");
const router = express.Router();

// get all the subjects
router.get("/", auth, async (req, res) => {
  const subjects = await Subject.find({}).select("-_id -__v");
  res.send(subjects);
});

// create a new subject
router.post("/", dAdminAuth, async (req, res) => {
  const errorMsg = validateSubject(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  let subject = await Subject.findOne(req.body);
  if (subject) return res.status(400).send("Subject already exists");

  subject = new Subject(req.body);
  await subject.save();

  res.send(subject);
});

// remove subject using name
router.delete("/:name", async (req, res) => {
  const name = req.params.name;
  const result = await Subject.findOneAndDelete({ name });
  if (result) return res.send(result);
  res.status(400).send("Subject already deleted");
});

module.exports = router;
