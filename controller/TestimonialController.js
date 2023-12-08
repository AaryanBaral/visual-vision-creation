const TestimonyModel = require("../models/TestimonialModel");
const uploadImage = require("../middleware/UploadFile");
const testimonydb = TestimonyModel.testimonydb;

exports.CreateTestimony = async(req, res)=>{
    try{
        if(!req.body){
            res.status(300).send("no data found.")
            return ;
        }
        let file = {};
        if(req.file){
            file = {
                type:req.file.mimetype,
                buffer:req.file.buffer
            }
        }
        const imageUrl = await uploadImage.UploadImage(file)
        const{name, testimony} = req.body;
        const newtestimony = new testimonydb({
            name,
            testimony,
            imageUrl,

        })
        await newtestimony.save(); 
        res.send("data saved sucessfully");

    }catch(err){
        res.status(500).send(`error occoured ------> ${err}`);
    }

}
exports.FileInfo = async(req, res)=>{
    try{
        const file = {};
        if(req.file){
            file = {
                type:req.file.mimetype,
                buffer:req.file.buffer
            }
        }
    }catch(err){
        res.status(300).send(err)
    }
}