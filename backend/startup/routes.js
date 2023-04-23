const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// middlewares
const error = require("../middlewares/error");
const fileUpload = require("express-fileupload");

// routes
const home = require("../routes/home");
const auth = require("../routes/auth");
const classes = require("../routes/classes");
const divisionalAdmins = require("../routes/divisionalAdmins");
const exams = require("../routes/exams");
const schools = require("../routes/schools");
const schoolAdmins = require("../routes/schoolAdmins");
const students = require("../routes/students");
const subjects = require("../routes/subjects");
const teachers = require("../routes/teachers");
const timetables = require("../routes/timetables");
const users = require("../routes/users");
const upload = require("../routes/upload");

module.exports = function (app) {
  // middlewares
  app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    fileUpload({
      limits: {
        fileSize: 10000000, // Around 10MB
      },
      abortOnLimit: true,
    })
  );
  if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));
  // assign public folder
  app.use(express.static("public"));

  // assign route paths
  app.use("/", home);
  app.use("/api/auth", auth);
  app.use("/api/classes", classes);
  app.use("/api/divisionalAdmins", divisionalAdmins);
  app.use("/api/exams", exams);
  app.use("/api/schools", schools);
  app.use("/api/schoolAdmins", schoolAdmins);
  app.use("/api/students", students);
  app.use("/api/subjects", subjects);
  app.use("/api/teachers", teachers);
  app.use("/api/timetables", timetables);
  app.use("/api/users", users);
  app.use("/api/upload", upload);

  app.use(error);
};
