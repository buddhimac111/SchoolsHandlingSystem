const express = require("express");
const mongoose = require("mongoose");
const saveImage = require("../utils/saveImage");
const fs = require("fs");
const createUser = require("../utils/createUser");
const deleteUser = require("../utils/deleteUser");

const { User, validateUser } = require("../models/user");
const router = express.Router();

// get all the users
router.get("/", async (req, res) => {
  const users = await User.find({}).sort("name");
  res.send(users);
});

// get user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");
  const user = await User.findById(id);
  if (user) return res.send(user);
  res.status(404).send("User not found");
});

// create user
router.post("/", async (req, res) => {
  const { userBody, otherBody } = req.body;

  const errorUser = validateUser(userBody);
  if (errorUser) return res.status(400).send(errorUser);

  const exist = await User.findOne({ email: userBody.email });
  if (exist)
    return res.status(400).send("User already exists with existing email");

  const user = new User(userBody);
  otherBody.user = user._id.toHexString();

  const other = createUser(user.role, otherBody);
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

    await session.commitTransaction();

    res.send(other.body);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).send(err.message);
  } finally {
    session.endSession();
  }
});

// update user by id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  const errorUser = validateUser(req.body);
  if (errorUser) return res.status(400).send(errorUser);

  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (result) return res.send(result);

  res.status(404).send("User not found");
});

// update user image
router.patch("/picture/:id", async (req, res) => {
  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

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
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid school id");

  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).send("User already deleted");
  if (!/default.png/.test(user.picture))
    fs.unlink(`./public/${user.picture}`, (err) => {
      if (err && err.code !== "ENOENT") return res.status(500).send(err);
    });
  const result = await deleteUser(id, user.role);
  result.user = user;
  res.send(result);
});

module.exports = router;
