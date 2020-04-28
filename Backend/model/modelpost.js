var mongoose = require('mongoose');
var schema = mongoose.Schema(
    {
        UserName   : { type: String },
        Post   : {type :String},
        Title  :{type : String },
        Category :{type:String },
        Date :{type : String},
        likes:{type :Object},
        comments:{type:Object}

    },
    {
        versionKey: false
    }
);

module.exports= mongoose.model('postdata', schema);