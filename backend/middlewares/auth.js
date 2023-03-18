const jwt = require("jsonwebtoken");
const { SchoolAdmin } = require("../models/schoolAdmin");

function auth(req, res, next) {
  const result = authorize(req);
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
  req.user = result;
  next();
}

function dAdminAuth(req, res, next) {
  const result = authorize(req, "dAdmin");
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
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
  const sAdmin = await SchoolAdmin.findOne({ user: req.user._id });
  if (!sAdmin) return res.status(400).send("User not found");

  req.user.school = sAdmin.school.toHexString();
  next();
}

function studentAuth(req, res, next) {
  const result = authorize(req, "student");
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
  req.user = result;
  next();
}

function teacherAuth(req, res, next) {
  const result = authorize(req, "teacher");
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).send(message);
  }
  req.user = result;
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
