const practiceModel = require("../models/PracticeModel")
const practicedb = practiceModel.practicedb;

exports.CreatePractice = async(req, res)=>{
    try{
        const{name, email, password, experties} = req.body;
        if(!req.body){
            res.status(300).send("no data found.")
            return ;
        }
        const newpractice = new practicedb({
            name,
            email,
            password,
            experties
        }) 
        await newpractice.save(); 
        res.send("data saved sucessfully");

    }catch(err){
        res.status(500).send("error occoured");
    }

}