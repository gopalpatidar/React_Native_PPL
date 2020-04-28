const express = require("express");
const app = express.Router();
const apicategory = require("../api/apicategories");
const multer = require("multer");
const upload = multer({
  dest: "/home/com114/Project/myFirstApp1/Backend/public/UploadImage"
});


// for Categorise

app.post("/categories", upload.single("Icon"), async function(req, res) {
  console.log('aaa')
  var obj = req.body;
  try {
    obj.Icon = req.file.filename;
    await apicategory.usercategory(obj);
    let data1 = req.body.Gmail;
    var data = await apicategory.showpost(data1);
    res.send(data);
  } catch (err) {
    res.send(false);
  }
});

app.post("/showcategory", async function(req, res) {
  try {
    let data1 = req.body.Gmail;
    var data = await apicategory.showpost(data1);
    res.send(data);
    // res.send(str)
  } catch (err) {
    res.send("false");
  }
});
module.exports = app;
