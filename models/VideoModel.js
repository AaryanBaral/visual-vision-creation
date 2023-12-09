const mongoose = require("mongoose");
var VideoModel = mongoose.Schema({
    videoUrl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    categories:[{ 
        type:String,
        required:true,
    }],

})
exports.videodb = mongoose.model('video',OurTeamModel);