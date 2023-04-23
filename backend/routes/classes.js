const express = require("express");

const { Class, validateClass } = require("../models/classe");

const { sAdminAuth, teacherAuth, auth } = require("../middlewares/auth");

const router = express.Router();

// get all the classes
router.get("/", sAdminAuth, async (req, res) => {
  const classes = await Class.aggregate([
    { $match: { school: req.user.school } }, // filter by school
    { $project: { _id: 1 } }, // extract _id field
    { $group: { _id: null, ids: { $push: "$_id" } } }, // group all ids into an array
    { $project: { _id: 0, ids: 1 } }, // return only the ids array
  ]);
  res.send(classes[0].ids);
});

// get teachers and students current assigned class
router.get("/me", auth, async (req, res) => {
  if (req.user.role !== "student" && req.user.role !== "teacher")
    return res.status(400).send("Invalid request");
  const classe = await Class.findOne({
    _id: req.user.classe,
    school: req.user.school,
  });
  if (!classe) return res.status(404).send("Class not found");

  res.send(classe);
});

// get class by id
router.get("/:id", sAdminAuth, async (req, res) => {
  const _id = req.params.id;

  const classe = await Class.findOne({ _id, school: req.user.school }).select(
    "-__v"
  );
  if (classe) return res.send(classe);

  res.status(404).send("Class not found");
});

// create a new class
router.post("/", sAdminAuth, async (req, res) => {
  req.body.school = req.user.school;

  let classe = await Class.findOne(req.body);
  if (classe) return res.status(400).send("Class already exists");

  const exist = await Class.findOne({ school: req.body.school })
    .sort({ _id: -1 })
    .select("_id");
  if (!exist) req.body._id = `${req.body.school}1`;
  else req.body._id = `${req.body.school}${parseInt(exist._id.slice(3)) + 1}`;

  const errorMsg = validateClass(req.body);
  if (errorMsg) return res.status(400).send(errorMsg);

  classe = new Class(req.body);
  await classe.save();

  res.send(classe);
});

// update a new class
router.put("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;
  req.body.school = req.user.school;

  let classe = await Class.findOne(req.body);
  if (classe) {
    if (classe.id === id) return res.send(classe);
    return res.status(400).send("Class already exists");
  }

  req.body._id = id;
  const errorMsg = validateClass(req.body);
  if (errorMsg) res.status(400).send(errorMsg);
  req.body._id = undefined;

  classe = await Class.findByIdAndUpdate(id, req.body, { new: true });
  if (classe) return res.send(classe);
  res.status(404).send("Class not found");
});

// remove class using id
router.delete("/:id", sAdminAuth, async (req, res) => {
  const id = req.params.id;

  const result = await Class.findOneAndDelete({
    _id: id,
    school: req.user.school,
  });
  if (result) return res.send(result);
  res.status(400).send("Class already deleted");
});

// analytics for class

async function getAverageMarks(_id, school) {
  const classe = await Class.aggregate([
    { $match: { _id, school } },
    {
      $lookup: {
        localField: "_id",
        from: "exams",
        foreignField: "classe",
        as: "exams",
      },
    },
    { $project: { exams: "$exams.results", _id: 0 } },
    { $unwind: { path: "$exams" } },
    { $unwind: { path: "$exams" } },
    { $group: { _id: "$exams.subject", marks: { $avg: "$exams.marks" } } },
    { $sort: { _id: 1 } },
    {
      $group: {
        _id: null,
        subjects: { $push: "$_id" },
        marks: { $push: "$marks" },
      },
    },
  ]);
  return classe;
}

// get average marks for teachers class
router.get("/marks/average", teacherAuth, async (req, res) => {
  const result = await getAverageMarks(req.user.classe, req.user.school);

  res.send(result[0]);
});

// get average marks for a class
router.get("/marks/average/:id", sAdminAuth, async (req, res) => {
  const _id = req.params.id;

  const classe = await Class.findOne({ _id, school: req.user.school });
  if (!classe) return res.status(404).send("Class not found");

  const result = await getAverageMarks(_id, req.user.school);

  res.send(result[0]);
});

module.exports = router;
