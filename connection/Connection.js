const mongoose = require("mongoose");

exports.connectDb = async ()=>{
    try{
        const con = mongoose.connect(process.env.Mongo_URL)
        console.log("database connected sucessfully.")
    }
    catch(err){
        console.log(`Error occoured while connecting database ----> ${err}`)
    }
}