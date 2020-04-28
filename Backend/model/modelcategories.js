var mongoose = require("mongoose");
var schema = mongoose.Schema(
  {
    Gmail: { type: String },
    Icon: { type: String },
    Category: { type: String, unique: true }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("categoriesdata", schema);
