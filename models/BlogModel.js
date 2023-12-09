const mongoose = require("mongoose");
var BlogModel = mongoose.Schema({
    videoUrl:{
        type:String,
        required:true,
    },
    title:[{
        type:String,
        required:true,
    }],
    description:{
        type:String,
    }

})
exports.blogdb = mongoose.model('blog',BlogModel);