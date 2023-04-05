const express = require("express");
const mongoose = require("mongoose");
const saveImage = require("../utils/saveImage");
const fs = require("fs");
const createUser = require("../utils/createUser");
const deleteUser = require("../utils/deleteUser");
const { encrypt } = require("../utils/hash");

const { User, validateUser } = require("../models/user");
const { SchoolAdmin } = require("../models/schoolAdmin");
const { auth } = require("../middlewares/auth");
const { Class } = require("../models/classe");
const { School } = require("../models/school");
const generateId = require("../utils/generateId");
const router = express.Router();

// get user
router.get("/me", auth, async (req, res) => {
  const id = req.user._id;

  const user = await User.findById(id).select("-__v -password");
  if (user) return res.send(user);

  res.status(404).send("User not found");
});

// create user
router.post("/", auth, async (req, res) => {
  const { userBody, otherBody } = req.body;

  let error = validAccess(req.user.role, userBody.role);

  // return error if user did not have access to update
  if (error)
    return res.status(403).send("Access denied, not enough permissions");

  if (userBody.role === "teacher" || userBody.role === "student") {
    const sAdmin = await SchoolAdmin.findById(req.user._id).select(
      "school -_id"
    );
    otherBody.school = sAdmin.school;
  }

  result = await generateId(userBody.role, otherBody.school);
  if (result.error) return res.status(400).send(result.error);
  userBody._id = result;

  const errorUser = validateUser(userBody);
  if (errorUser) return res.status(400).send(errorUser);

  const exist = await User.findOne({ email: userBody.email });
  if (exist)
    return res.status(400).send("User already exists with existing email");

  userBody.password = await encrypt(userBody.password);
  const user = new User(userBody);
  otherBody._id = user._id;

  const other = await createUser(user.role, otherBody);
  if (other.errorBody) return res.status(400).send(other.errorBody);

  // starting session to perform task set
  // if anything goes wrong tasks will rollback
  const session = await User.startSession();
  try {
    session.startTransaction();
    // add session parameter for each save({session})
    // transactions only supported by replica set
    await user.save();
    await other.body.save();
    if (user.role === "student") {
      await Class.findByIdAndUpdate(other.body.classe, {
        $inc: { studentCount: 1 },
      });
      await School.findByIdAndUpdate(other.body.school, {
        $inc: { studentCount: 1 },
      });
    } else if (user.role === "teacher") {
      await School.findByIdAndUpdate(other.body.school, {
        $inc: { teacherCount: 1 },
      });
    }

    await session.commitTransaction();
    user.password = undefined;
    user.__v = undefined;
    other.body.user = undefined;
    other.body._id = undefined;
    other.body.__v = undefined;

    res.send({ ...other.body._doc, ...user._doc });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).send(err.message);
  } finally {
    session.endSession();
  }
});

// update user by id
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) return res.status(404).send("User not found");
  req.body.role = user.role;
  req.body._id = id;
  let error = validAccess(req.user.role, req.body.role);

  if (error)
    return res.status(403).send("Access denied, not enough permissions");

  const errorUser = validateUser(req.body);
  if (errorUser) return res.status(400).send(errorUser);

  const exist = await User.findOne({ email: req.body.email });
  if (exist && exist._id !== id)
    return res.status(400).send("User already exists with existing email");

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (result) return res.send(result);

  res.status(404).send("User not found");
});

// update user image
router.patch("/picture/:id", auth, async (req, res) => {
  let error = validAccess(req.user.role, req.body.role);

  if (error)
    return res.status(403).send("Access denied, not enough permissions");

  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) return res.status(404).send("User not found");

  if (!/default.png/.test(user.picture))
    fs.unlink(`./public/${user.picture}`, (err) => {
      if (err && err.code !== "ENOENT") return res.status(500).send(err);
    });

  user.picture = await saveImage(picture, `profilePic/${user._id}`);

  await user.save();
  res.send(user);
});

// delete user and its relations
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;

  let user = await User.findById(id);
  if (!user) user = { role: "" };

  let error = validAccess(req.user.role, user.role);
  if (error)
    return res.status(403).send("Access denied, not enough permissions");

  user = await User.findByIdAndDelete(id).select("-__v -password");
  if (!user) return res.status(404).send("User already deleted");
  if (!/default.png/.test(user.picture))
    fs.unlink(`./public/${user.picture}`, (err) => {
      if (err && err.code !== "ENOENT") return res.status(500).send(err);
    });

  const result = await deleteUser(id, user.role);

  if (user.role === "student") {
    await Class.findByIdAndUpdate(result.classe, {
      $inc: { studentCount: -1 },
    });
    await School.findByIdAndUpdate(result.school, {
      $inc: { studentCount: -1 },
    });
  } else if (user.role === "teacher") {
    await School.findByIdAndUpdate(result.school, {
      $inc: { teacherCount: -1 },
    });
  }
  user.password = undefined;
  user.__v = undefined;
  result.user = undefined;
  result._id = undefined;
  result.__v = undefined;

  res.send({ ...result._doc, ...user._doc });
});

function validAccess(uRole, bRole) {
  if (uRole === "teacher" || uRole === "student") return true;
  else if (bRole === "dAdmin" && uRole !== "super") return true;
  else if (bRole === "sAdmin" && uRole !== "dAdmin") return true;
  else if ((bRole === "teacher" || bRole === "student") && uRole !== "sAdmin")
    return true;
  return false;
}

module.exports = router;
