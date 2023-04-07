const express = require("express");

const { SchoolAdmin, validateSAdmin } = require("../models/schoolAdmin");
const { Exam } = require("../models/exam");
const { dAdminAuth, sAdminAuth } = require("../middlewares/auth");
const router = express.Router();

// get all the schoolAdmins
router.get("/", dAdminAuth, async (req, res) => {
  const schoolAdmins = await SchoolAdmin.aggregate([
    { $project: { _id: 1 } },
    { $group: { _id: null, ids: { $push: "$_id" } } },
    { $project: { _id: 0, ids: 1 } },
  ]);
  res.send(schoolAdmins[0].ids);
});

// get average marks
router.get("/averages", sAdminAuth, async (req, res) => {
  const result = await Exam.aggregate([
    {
      $lookup: {
        localField: "classe",
        from: "classes",
        foreignField: "_id",
        as: "classe",
      },
    },
    { $unwind: { path: "$classe" } },
    { $match: { "classe.school": req.user.school } },
    {
      $addFields: {
        totalMarks: {
          $reduce: {
            input: "$results.marks",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this"],
            },
          },
        },
        maxMarks: {
          $multiply: [{ $size: "$results" }, 100],
        },
      },
    },
    {
      $addFields: {
        percentage: {
          $multiply: [{ $divide: ["$totalMarks", "$maxMarks"] }, 100],
        },
      },
    },
    { $sort: { percentage: 1 } },
    {
      $bucket: {
        groupBy: "$percentage",
        boundaries: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        default: "Other",
        output: {
          count: { $sum: 1 },
        },
      },
    },
    {
      $project: {
        range: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);
  res.send(result);
});

// get logged admin details
router.get("/me", sAdminAuth, async (req, res) => {
  const id = req.user._id;

  const schoolAdmin = await SchoolAdmin.findById(id).select("-__v");

  if (schoolAdmin) return res.send(schoolAdmin);
  res.status(404).send("User not found");
});

// get schoolAdmin by id
router.get("/:id", dAdminAuth, async (req, res) => {
  const id = req.params.id;

  const schoolAdmin = await SchoolAdmin.findById(id).select("-__v");

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
  }).select("-__v");
  if (schoolAdmin) return res.send(schoolAdmin);
  res.status(404).send("User not found");
});

module.exports = router;
