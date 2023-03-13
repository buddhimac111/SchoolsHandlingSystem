const express = require("express");
const mongoose = require("mongoose");

const { User, validateUser } = require("../models/user");
const { Student, validateStudent } = require("../models/student");

const router = express.Router();

// get all the students
router.get("/", async (req, res) => {
  const students = await Student.find({}).select("-_id -__v -parent._id");
  res.send(students);
});

// get student by their user id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");
  const student = await Student.findOne({ user: id })
    .select("-_id -__v -parent._id")
    .populate("user");
  if (!student) return res.status(404).send("Student not found");
  res.send(student);
});

// create a new student
router.post("/", async (req, res) => {
  const { userBody, studentBody } = req.body;
  const errorUser = validateUser(userBody);
  if (errorUser) return res.status(400).send(errorUser);

  const exist = await User.findOne({ email: userBody.email });
  if (exist)
    return res.status(400).send("User already exists with existing email");

  const user = new User(userBody);
  studentBody.user = user._id.toHexString();

  const errorStudent = validateStudent(studentBody);
  if (errorStudent) return res.status(400).send(errorStudent);
  const student = new Student(studentBody);

  // starting session to perform task set
  // if anything goes wrong tasks will rollback
  const session = await User.startSession();
  try {
    session.startTransaction();
    // add session parameter for each save({session})
    // transactions only supported by replica set
    await user.save();
    await student.save();

    res.send(student);

    await session.commitTransaction();
  } catch (err) {
    res.status(400).send(err.message);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
});

// update a student by their user id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const { userBody, studentBody } = req.body;
  studentBody.user = id;

  const errorUser = validateUser(userBody);
  if (errorUser) return res.status(400).send(errorUser);

  const errorStudent = validateStudent(studentBody);
  if (errorStudent) return res.status(400).send(errorStudent);

  let result = await User.findByIdAndUpdate(id, userBody, { new: true });

  if (!result) return res.status(404).send("User not found");
  result = await Student.findOneAndUpdate({ user: id }, studentBody, {
    new: true,
  });

  res.send(result);
});

module.exports = router;
