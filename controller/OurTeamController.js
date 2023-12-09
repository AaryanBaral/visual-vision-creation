const OurTeamModel = require("../models/OurTeamModel");
const image = require("../middleware/UploadFile");
const ourteamdb = OurTeamModel.ourteamdb;

exports.CreateOurTeam = async(req,res)=>{
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
        const{name, testimony,designatoin} = req.body;
        const new_our_team = new ourteamdb({
            name,
            testimony,
            designatoin,
            imageUrl,
        })
        await new_our_team.save();
        res.json("data saved sucessfully");
    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }
}

exports.DeleteOurTeam = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        const id = req.params.id;
        const d = await ourteamdb.findById({_id:id});
        await ourteamdb.findByIdAndDelete({_id:id});
        image.DeleteImage(d.imageUrl);
        res.json({message:"our team of given id deleted sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}
exports.FindOurTeam = async(req,res)=>{
    try{
        if(req.query.id){
            const id = req.query.id;
            const data = await ourteamdb.findById({_id:id});
            res.json(data);
            return;
        }
        const data = await ourteamdb.find();
        res.json(data);
        return;
    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }
}
exports.UpdateOurTeam = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        } 
        if(!req.body){
            res.status(100).json({message:"no information provided"});
            return;
        }
        const{name, testimony,designatoin} = req.body;
        let file = {};
        if(req.file){
            file = {
                type:req.file.mimetype,
                buffer:req.file.buffer
            }
        }
        const id = req.params.id;
        const d = await ourteamdb.findById({_id:id});
        image.DeleteImage(d.imageUrl);
        const snapshot = await image.UploadImage(file);
        const imageUrl = snapshot.DownloadUrl
        await ourteamdb.findByIdAndUpdate({_id:id},{
            name,
            testimony,
            designatoin,
            imageUrl,
        });
        res.json({mesage:"testimony updated sucessfully"});
        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}