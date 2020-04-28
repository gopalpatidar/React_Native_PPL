const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./router/auth-router");
const postRouter = require('./router/post-router');
const commentRouter =require('./router/comment-router');
const categoryRouter=require('./router/categories-router')
const hostName = "192.168.100.111";
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/reactnative", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  },function(err, result) {
  if (err) throw err;
  console.log("created");
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/post/auth", postRouter);
app.use("/comment/auth", commentRouter);
app.use("/category/auth", categoryRouter);

app.listen(9000,() => {
  console.log("chala");
});
