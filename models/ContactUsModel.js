const mongoose = require("mongoose");
var ContactModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    contact:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    }

})
exports.contactdb = mongoose.model('contact',ContactModel);