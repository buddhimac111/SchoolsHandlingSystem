const express = require("express");
const mongoose = require("mongoose");
const { dAdminAuth, auth } = require("../middlewares/auth");

const { Subject, validateSubject } = require("../models/subject");
const router = express.Router();

// get all the subjects
router.get("/", auth, async (req, res) => {
  const subjects = await Subject.find({}).select("-__v");
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

// remove subject using _id
router.delete("/:_id", async (req, res) => {
  const _id = req.params._id;
  const result = await Subject.findByIdAndDelete(_id);
  if (result) return res.send(result);
  res.status(400).send("Subject already deleted");
});

module.exports = router;
