var mongoose = require('mongoose');
var schema = mongoose.Schema(
    {
        userName:     {type: String},
        passWord: { type: String },
        email   : { type: String },
        firstName :{type:String },
        lastName   : {type :String},
    },
    {
        versionKey: false
    }
);

module.exports= mongoose.model('ppldata', schema);