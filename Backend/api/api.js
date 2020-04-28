const db = require("../model/model");
module.exports = {
  adduser: data => {
    return new Promise((resolve, reject) => {
      db.create(data, function(err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  showuser: (Gmail) => {
    return new Promise((resolve, reject) => {
      db.find({ email: Gmail}, (err, result) => {
        if (err || result.length === 0) reject(err);
        else resolve(result);
      });
    });
  },
  checkusers: Gmail => {
    return new Promise((resolve, reject) => {
      db.find({ email: Gmail }, (err, result) => {
        if (result.length == 0) reject(err);
        else resolve(result);
      });
    });
  },
  checkuser: (email,userName) => {
    console.log(email,userName);
    return new Promise((resolve, reject) => {
      db.find({ $or: [ { userName: userName }, { email: email } ] }, (err, result) => {
        if (err) reject(err);
        else 
        resolve(result)
      });
    });
  }
};
