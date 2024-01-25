const mongoose = require("mongoose");
var PackageModel = mongoose.Schema({
    typeName:{type:String,required:true},
    noOfPhotos:{type:String,required:true},
    location:{type:String,required:true},
    timeline:{type:String,required:true},
    service:{type:String,required:true},
    message:{type:String,required:true},

})
exports.packagedb = mongoose.model('package',PackageModel);