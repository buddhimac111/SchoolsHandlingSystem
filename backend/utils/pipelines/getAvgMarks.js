const mongoose = require("mongoose");
module.exports = function (classe, semester) {
  return [
    {
      $match: {
        _id: classe,
      },
    },
    {
      $lookup: {
        from: "exams",
        localField: "_id",
        foreignField: "classe",
        as: "examresults",
      },
    },
    {
      $unwind: {
        path: "$examresults",
      },
    },
    {
      $match: {
        "examresults.semester": semester,
      },
    },
    {
      $unwind: {
        path: "$examresults.results",
      },
    },
    {
      $group: {
        _id: "$examresults.results.subject",
        averagemarks: {
          $avg: "$examresults.results.marks",
        },
      },
    },
  ];
};
