const mongoose = require("mongoose");
var PhotoModel = mongoose.Schema({
    imageUrl:{
        type:String,
        required:true,
    },
    category:[{
        type:String,
        required:true,
    }],
    description:{
        type:String,
    }

})
exports.photodb = mongoose.model('photo',PhotoModel);