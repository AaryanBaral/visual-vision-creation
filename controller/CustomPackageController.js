const packagedb = require("../models/CustomPackageModel").packagedb
exports.CreatePackage = async(req,res)=>{
    if(!req.body){
        res.status(301).json({message:"data not sent"});
        return;
    }
    const{typeName,noOfPhotos,location,timeline,service,message} = req.body;
    if(!typeName||!noOfPhotos||!location||!timeline||!service||!message){
        res.status(301).json({message:"cmplete data not sent"});
        return;
    }
    try{
        const newPackage = await new packagedb({
            typeName,
            noOfPhotos,
            location,
            timeline,
            service,
            message
        })
        const data = await newPackage.save();
        if(!data){
            res.status(401).json({message:"data not saved error ------->"});
            return;
        }
    }catch(err){
        res.status(401).json({message:"data not saved error ------->",err});
        return;
    }


}