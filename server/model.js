const mongoose = require("mongoose");
const Model = mongoose.Schema(
  {
    name: { type: String },
    course: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("checkers", Model);
