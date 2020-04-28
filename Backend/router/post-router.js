const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express.Router();
const apiPost = require('../api/apipost');
const multer = require('multer');
const upload = multer({
  dest: '/home/com114/Project/myFirstApp1/Backend/public/UploadImage',
});
app.get('/send', (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'ankur.gahtori@daffodilsw.com',
    from: 'gopal.patidar@daffodilsw.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send('mail sent');
    })
    .catch(err => {
      res.send('error');
      console.log('error', err);
    });
});
app.post('/post', upload.single('Post'), async function(req, res) {
  var obj = req.body;
  obj.Post = req.file.filename;
  try {
    var d = new Date();
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    obj.Date =
      d.getDate() +
      ' ' +
      months[d.getMonth()] +
      ' ' +
      d.getFullYear() +
      '    ' +
      d.getHours() +
      ':' +
      d.getMinutes();
    obj.likes = [];
    obj.comments = [];
    await apiPost.userpost(obj);
    res.send(true);
  } catch (err) {
    res.send(false);
  }
});

app.post('/showpost', async function(req, res) {
  try {
    var data = await apiPost.showpost();
    res.send(data);
    // res.send(str)
  } catch (err) {
    res.send('false');
  }
});

app.post('/likepost', async function(req, res) {
  try {
    await apiPost.likepost(req.body);
    var data = await apiPost.showlikes(req.body);
    res.send(data);
  } catch (err) {
    res.send('false');
  }
});

app.post('/comment', async function(req, res) {
  try {
    // await apiCommentNew.addComent(obj)
    await apiPost.addComent(req.body);
    var data = await apiPost.showlikes(req.body);
    res.send(data);
  } catch (err) {
    res.send('false');
  }
});

app.post('/sort', async function(req, res) {
  try {
    let text = req.body.sort;
    if (text == 'latestFirst') {
      data = await apiPost.latestFirst(req.body.limit);
    } else if (text == 'oldestFirst') {
      data = await apiPost.oldestFirst(req.body.limit);
    } else if (text == 'mostLikes') {
      data = await apiPost.mostLike(req.body.limit);
    } else if (text == 'mostComment') {
      data = await apiPost.mostComment(req.body.limit);
    }
    res.send(data);
  } catch (err) {
    res.send(false);
  }
});
module.exports = app;
