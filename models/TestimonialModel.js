const mongoose = require("mongoose");

var TestimonyModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    testimony:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    }
})
exports.testimonydb = mongoose.model('testimony',TestimonyModel);