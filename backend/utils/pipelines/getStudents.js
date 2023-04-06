const mongoose = require("mongoose");

module.exports = function (classe) {
  return [
    {
      $match: {
        _id: classe,
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "classe",
        as: "students",
      },
    },
    {
      $project: {
        _id: 0,
        ids: "$students._id",
      },
    },
  ];
};
