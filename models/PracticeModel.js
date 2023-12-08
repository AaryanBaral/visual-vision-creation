const mongoose = require("mongoose");

var PracticeModel = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    experties:[{
        type:String,
        required:true
    }]
})
exports.practicedb = mongoose.model('practice',PracticeModel);