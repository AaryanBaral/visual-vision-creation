const photodb = require("../models/PhotoModel").photodb;
const image = require("../middleware/UploadFile");

exports.CreatePhoto = async(req, res)=>{
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
        const{category,description} = req.body;
        const newphoto = new photodb({
            category,
            description,
            imageUrl,

        })
        const data = await newphoto.save(); 
        if(!data){
            res.status(300).json({message:"error"});
            return ;
        }
        res.json("photo saved sucessfully");

    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }

}


exports.UpdatePhoto = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        if(!req.body){
            res.status(100).json({message:"no information provided"});
            return;
        }
        const{categoty,description} = req.body;
        let file = {};
        if(req.file){
            file = {
                type:req.file.mimetype,
                buffer:req.file.buffer
            }
        }
        const id = req.params.id;
        const d = await photodb.findById({_id:id});
        image.DeleteImage(d.imageUrl);
        const snapshot = await image.UploadImage(file);
        const imageUrl = snapshot.DownloadUrl
        const data = await photodb.findByIdAndUpdate({_id:id},{
            categoty,
            description,
            imageUrl,
        });
        if(!data){
            res.status(300).json({message:"photo of given id not found"});
            return ;
        }
        res.json({mesage:"photo updated sucessfully"});
        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }

    

}



exports.DeletePhoto = async(req,res)=>{
    try{
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        const id = req.params.id;
        const d = await photodb.findById({_id:id});
        const data = await photodb.findByIdAndDelete({_id:id});
        if(!data){
            res.status(300).json({message:"photo of given id not found"});
            return ;
        }
        image.DeleteImage(d.imageUrl);
        res.json({message:"photo deleted sucessfully"})
    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }


}



exports.FindPhoto = async(req,res)=>{
    try{
        if(req.query.id){
            const id = req.query.id;
            const data = await photodb.findById({_id:id});
            res.json(data);
            return;
        }
        if(req.query.category){
            const regex = {$regex:req.query.category,$options:'i'};
            const data = await photodb.find({category:regex});
            res.send(data);
            return ;
        }
        const data = await photodb.find();
        res.json(data);
        return;
    }catch(err){
        res.status(500).json(`error occoured ------> ${err}`);
    }

}