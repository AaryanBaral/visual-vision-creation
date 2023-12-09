
const mongoose = require("mongoose");

var OurTeamModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    testimony:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
})
exports.ourteamdb = mongoose.model('our_team',OurTeamModel);