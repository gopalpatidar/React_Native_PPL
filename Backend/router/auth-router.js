const express = require('express');
const app = express.Router();
const api = require('../api/api');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const upload = multer({
  dest: '/home/com114/Project/myFirstApp1/image/uploads',
});

app.post('/header', async function(req, res) {
  var obj = req.body;
  let temp = 0;
  try {
    var email = obj['email'];
    var userName = obj['userName'];
    var userData = await api.checkuser(email, userName);
    var check = {
      email: '%#check%',
      userName: '#####',
    };
    userData.map((data, id) => {
      if (email === data.email) {
        check.email = data.email;
        temp = 1;
      }
      if (userName === data.userName) {
        check.userName = data.userName;
        temp = 1;
      }
    });
    res.send(check);
    if (temp == 0) {
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(obj.passWord, salt, async function(err, hash) {
          // Store hash in your password DB.
          obj.passWord = hash;
          await api.adduser(obj);
        });
      });
      res.send(check);
    }
  } catch (err) {
    res.send(err);
  }
});

app.post('/login', async function(req, res) {
  try {
    var obj = req.body;
    var name = obj['email'];
    var pass = obj['passWord'];
    var data = await api.showuser(name);
    bcrypt.compare(pass, data[0].passWord, function(err, result) {
      if (result) {
        res.send(data);
      } else {
        res.send(false);
      }
    });
  } catch (err) {
    res.send('false');
  }
});

app.post('/check', async function(req, res) {
  try {
    var obj = req.body;
    obj = obj['Email'];
    var data = await api.checkusers(obj);
    res.send(true);
    // res.send(str)
  } catch (err) {
    res.send(false);
  }
});
module.exports = app;
