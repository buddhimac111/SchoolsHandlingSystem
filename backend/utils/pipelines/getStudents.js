const mongoose = require("mongoose");

module.exports = function (classe) {
  return [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(classe),
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
        students: true,
      },
    },
  ];
};
