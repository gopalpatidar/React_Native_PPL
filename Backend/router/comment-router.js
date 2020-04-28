const express = require("express");
const app = express.Router();
const apiComment = require("../api/apicomment");
const apiCommentNew=require('../api/apipost')

app.post("/comment", async function(req, res) {
  try {
    let obj=req.body;
    await apiCommentNew.addComent(obj)
    let data = await apiCommentNew.showComent(obj.Postid);
  
    res.send(data);
  } catch (err) {
    res.send("false");
  }
});

app.post("/showcomment", async function(req, res) {
  try {
    let data1 = req.body.Postid;
    // let data = await apiComment.showComent(data1);
    console.log(data1)
    let  data=await apiCommentNew.showComent(data1)
    res.send(data);
  } catch (err) {
    res.send("false");
  }
});

module.exports = app;
