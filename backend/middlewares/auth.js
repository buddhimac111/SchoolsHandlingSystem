const jwt = require("jsonwebtoken");
const { SchoolAdmin } = require("../models/schoolAdmin");
const { Student } = require("../models/student");
const { Teacher } = require("../models/teacher");
const { User } = require("../models/user");
const getUser = require("../utils/getUser");

async function auth(req, res, next) {
  const secret = req.header("x-super-secret");
  if (secret) {
    if (secret !== process.env.JWT_PRIVATE_KEY)
      return res.status(403).send("Access denied, invalid secret");
    req.user = { role: "super" };
    return next();
  }
  const result = authorize(req);
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
  const exist = await User.findById(result._id);
  if (!exist) return res.status(400).send("Invalid Token User");

  const user = await getUser(result._id, result.role);
  if (!user) return res.status(400).send("Invalid Token User");
  if (user.school) result.school = user.school;
  if (user.classe) result.classe = user.classe;

  req.user = result;
  next();
}

async function dAdminAuth(req, res, next) {
  const result = authorize(req, "dAdmin");
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }

  const exist = await User.findById(result._id);
  if (!exist) return res.status(400).send("Invalid Token User");

  req.user = result;
  next();
}

async function sAdminAuth(req, res, next) {
  const result = authorize(req, "sAdmin");
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
  req.user = result;
  const sAdmin = await SchoolAdmin.findById(req.user._id).select("school -_id");
  if (!sAdmin) return res.status(400).send("Invalid Token User");
  req.user.school = sAdmin.school;

  next();
}

async function studentAuth(req, res, next) {
  const result = authorize(req, "student");
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
  req.user = result;
  const student = await Student.findById(req.user._id).select(
    "classe school -_id"
  );
  if (!student) return res.status(400).send("Invalid Token User");
  req.user.school = student.school;
  req.user.classe = student.classe;

  next();
}

async function teacherAuth(req, res, next) {
  const result = authorize(req, "teacher");
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }

  req.user = result;
  const teacher = await Teacher.findById(req.user._id).select(
    "classe school -_id"
  );
  if (!teacher) return res.status(400).send("Invalid Token User");

  req.user.school = teacher.school;
  req.user.classe = teacher.classe;
  next();
}

function superAuth(req, res, next) {
  const secret = req.header("x-super-secret");
  if (!secret) return res.status(401).send("Access denied, no secret provided");

  if (secret !== process.env.JWT_PRIVATE_KEY)
    return res.status(403).send("Access denied, invalid secret");

  next();
}

function authorize(req, role) {
  const token = req.header("x-auth-token");
  if (!token)
    return {
      error: { status: 401, message: "Acced Denied, no token provided" },
    };

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (role && decoded.role !== role)
      return {
        error: {
          status: 403,
          message: "Access denied, not have enough access",
        },
      };
    return decoded;
  } catch (err) {
    return { error: { status: 400, message: "Invalid token" } };
  }
}

module.exports.auth = auth;
module.exports.dAdminAuth = dAdminAuth;
module.exports.sAdminAuth = sAdminAuth;
module.exports.studentAuth = studentAuth;
module.exports.teacherAuth = teacherAuth;
module.exports.superAuth = superAuth;
