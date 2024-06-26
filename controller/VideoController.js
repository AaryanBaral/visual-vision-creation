const videodb = require("../models/VideoModel").videodb;

exports.CreateVideo = async(req, res)=>{
    try {
        if(!req.body){
            res.status(300).send("no data found.")
            return ;
        }
        const{description, videourl, category} = req.body;
        const newVideo = new videodb({
            videourl,
            description,
            category,
        })
        await newVideo.save();
        res.json({message:"video created sucessfully."});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}

exports.DeleteVideo = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        const id = req.params.id;
        await videodb.findByIdAndDelete({_id:id});
        res.json({message:"video of given id deleted sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}


exports.UpdateVideo = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        } 
        if(!req.body){
            res.status(100).json({message:"no information provided"});
            return;
        }
        const{description, videourl, category} = req.body;
        await videodb.findByIdAndUpdate({_id:id},{
            description, 
            videourl, 
            category,
        });
        res.json({message:"video of given id updated sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}


exports.FindVideo = async(req,res)=>{
    try {
        if(req.query.id){
            const id = req.query.id;
            const data = await videodb.findById({_id:id});
            res.json(data);
            return;
        }
        const data = await videodb.find();
        res.json(data);
        return;        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}