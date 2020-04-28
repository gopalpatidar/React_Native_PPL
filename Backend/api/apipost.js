const db = require('../model/modelpost');
module.exports = {
  userpost: data => {
    return new Promise((resolve, reject) => {
      db.create(data, function(err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  showpost: () => {
    return new Promise((resolve, reject) => {
      db.find({}, (err, result) => {
        if (err || result.length === 0) reject(err);
        else resolve(result);
      });
    });
  },
  latestFirst: (data) => {
    return new Promise((resolve, reject) => {
      db.find().sort({$natural:-1}).limit(data).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  oldestFirst: data => {
    return new Promise((resolve, reject) => {
      db.aggregate([{$limit: data}]).exec((err, res) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  likepost: data => {
    return new Promise((resolve, reject) => {
      db.updateOne(
        {_id: data.postId},
        {$addToSet: {likes: data.userName}},
        (err, result) => {
          if (err) reject(err);
          else {
            if (result.nModified == 0) {
              db.updateOne(
                {_id: data.postId, likes: data.userName},
                {$pull: {likes: data.userName}},
                (err, result) => {
                  if (err) reject(err);
                  else {
                    resolve(result);
                  }
                },
              );
            } else resolve(result);
          }
        },
      );
    });
  },

  showlikes: data => {
    return new Promise((resolve, reject) => {
      db.find({_id: data.postId}, (err, result) => {
        if (err || result.length === 0) {
          reject(err);
        } else resolve(result);
      });
    });
  },
  addComent: data => {
    return new Promise((resolve, reject) => {
      db.updateOne(
        {_id: data.postId},
        {$push: {comments: data}},
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  },
  showComent: data => {
    return new Promise((resolve, reject) => {
      db.find({_id: data}, (err, result) => {
        if (err || result.length === 0) {
          reject(err);
        } else resolve(result);
      });
    });
  },
  mostComment: data => {
    return new Promise((resolve, reject) => {
      db.aggregate([
        {
          $project: {
            _id: 1,
            likes: 1,
            Title: 1,
            comments: 1,
            UserName: 1,
            Post: 1,
            Date: 1,
            Category: 1,
            size: {
              $cond: {
                if: {$isArray: '$comments'},
                then: {$size: '$comments'},
                else: 'NA',
              },
            },
          },
        },
        {$sort: {size: -1}},
        {$limit: data},
      ]).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  mostLike: data => {
    return new Promise((resolve, reject) => {
      db.aggregate([
        {
          $project: {
            _id: 1,
            likes: 1,
            Title: 1,
            comments: 1,
            UserName: 1,
            Post: 1,
            Date: 1,
            Category: 1,
            size: {
              $cond: {
                if: {$isArray: '$likes'},
                then: {$size: '$likes'},
                else: 'NA',
              },
            },
          },
        },
        {$sort: {size: -1}},
        {$limit: data},
      ]).exec((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
};
