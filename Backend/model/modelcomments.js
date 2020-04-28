var mongoose = require("mongoose");
var schema = mongoose.Schema(
  {
    Postid: { type: String },
    UserName: { type: String },
    Comments: { type: String }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("commentsdata", schema);
