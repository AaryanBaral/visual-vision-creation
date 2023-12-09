const blogdb = require("../models/BlogModel").blogdb;

exports.CreateBlog = async(req, res)=>{
    try {
        if(!req.body){
            res.status(300).send("no data found.")
            return ;
        }
        const{description, videourl, title} = req.body;
        const newBlog = new blogdb({
            videourl,
            description,
            title,
        })
        await newBlog.save();
        res.json({message:"blog created sucessfully."});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}

exports.DeleteBlog = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        const id = req.params.id;
        await blogdb.findByIdAndDelete({_id:id});
        res.json({message:"blog of given id deleted sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}


exports.UpdateBlog = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        } 
        if(!req.body){
            res.status(100).json({message:"no information provided"});
            return;
        }
        const{description, videourl, title} = req.body;
        await blogdb.findByIdAndUpdate({_id:id},{
            description, 
            videourl, 
            title,
        });
        res.json({message:"blog of given id updated sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}


exports.FindBlog = async(req,res)=>{
    try {
        if(req.query.id){
            const id = req.query.id;
            const data = await blogdb.findById({_id:id});
            res.json(data);
            return;
        }
        const data = await blogdb.find();
        res.json(data);
        return;        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}