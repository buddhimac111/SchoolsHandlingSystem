const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const saveImage = require("../utils/saveImage");

const { School, validateSchool } = require("../models/school");
const { dAdminAuth, sAdminAuth } = require("../middlewares/auth");
const router = express.Router();

// get all the schools
router.get("/", dAdminAuth, async (req, res) => {
  const schools = await School.find({}).select("-__v");
  res.send(schools);
});

// get school by id
router.get("/:id", dAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid school id");

  const school = await School.findById(id).select("-__v");
  if (school) return res.send(school);

  res.status(404).send("School not found");
});

// create a new school
router.post("/", dAdminAuth, async (req, res) => {
  const errorMsg = validateSchool(req.body);
  if (errorMsg) res.status(400).send(errorMsg);

  let school = new School(req.body);
  await school.save();

  res.send(school);
});

// update school
router.put("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid school id");

  if (req.user.school !== id)
    return res
      .status(401)
      .send("Unauthorized access, you are not the owner of this school");

  const errorMsg = validateSchool(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  const result = await School.findByIdAndUpdate(id, req.body, { new: true });
  if (result) return res.send(result);
  res.status(404).send("School not found");
});

// update school image
router.patch("/picture/:id", sAdminAuth, async (req, res) => {
  const picture = req.files ? req.files.picture || undefined : undefined;
  if (!picture || !/image/.test(picture.mimetype))
    return res.status(400).send("Picture required or Invalid picture type");

  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid user id");

  if (req.user.school !== id)
    return res
      .status(401)
      .send("Unauthorized access, you are not the owner of this school");

  const school = await School.findById(id);
  if (!school) return res.status(404).send("School not found");

  if (!/default.png/.test(school.picture))
    fs.unlink(`./public/${school.picture}`, (err) => {
      if (err && err.code !== "ENOENT") return res.status(500).send(err);
    });

  school.picture = await saveImage(picture, `schoolPic/${school._id}`);

  await school.save();
  res.send(school);
});

// delete school
router.delete("/:id", dAdminAuth, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).send("Invalid school id");

  const school = await School.findByIdAndDelete(id);
  if (!school) return res.status(404).send("School already deleted");
  if (!/default.png/.test(school.picture))
    fs.unlink(`./public/${school.picture}`, (err) => {
      if (err && err.code !== "ENOENT") return res.status(500).send(err);
    });
  res.send(school);
});
module.exports = router;
