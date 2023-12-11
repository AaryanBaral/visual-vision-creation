const TestimonyModel = require("../models/TestimonialModel");
const image = require("../middleware/UploadFile");
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
        const snapshot = await image.UploadImage(file);
        const imageUrl = snapshot.DownloadUrl;
        const{name, testimony} = req.body;
        const newtestimony = new testimonydb({
            name,
            testimony,
            imageUrl,

        })
        await newtestimony.save(); 
        res.json("testimony saved sucessfully");

    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }

}
exports.UpdateTestimony = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        if(!req.body){
            res.status(100).json({message:"no information provided"});
            return;
        }
        const{name, testimony} = req.body;
        let file = {};
        if(req.file){
            file = {
                type:req.file.mimetype,
                buffer:req.file.buffer
            }
        }
        const id = req.params.id;
        const d = await testimonydb.findById({_id:id});
        image.DeleteImage(d.imageUrl);
        const snapshot = await image.UploadImage(file);
        const imageUrl = snapshot.DownloadUrl
        const data = await testimonydb.findByIdAndUpdate({_id:id},{
            name,
            testimony,
            imageUrl,
        });
        res.json({mesage:"testimony updated sucessfully"});
        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }

    

}
exports.DeleteTestimony = async(req,res)=>{
    try{
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        const id = req.params.id;
        const d = await testimonydb.findById({_id:id});
        const data = await testimonydb.findByIdAndDelete({_id:id});
        image.DeleteImage(d.imageUrl);
        res.json({message:"testimony deleted sucessfully"})
    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }


}
exports.FindTestimony = async(req,res)=>{
    try{
        if(req.query.id){
            const id = req.query.id;
            const data = await testimonydb.findById({_id:id});
            res.json(data);
            return;
        }
        const data = await testimonydb.find();
        res.json(data);
        return;
    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }

}