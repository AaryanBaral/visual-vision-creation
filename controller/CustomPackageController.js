const { connectStorageEmulator } = require("firebase/storage");

const packagedb = require("../models/CustomPackageModel").packagedb;


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
        res.send("data saved sucessfully");
        return;
    }catch(err){
        res.status(401).json({message:"data not saved error ------->",err});
        return;
    }


}


exports.FindPackage = async(req,res)=>{
    try {
        if(req.query.id){
            const id = req.query.id;
            const data = await packagedb.findById({_id:id});
            res.send(data);
            return;
        }
        const data = await packagedb.find();
        res.send(data);
        return;
    } catch (err) {
        res.status(401).json({messsage:`error----------------->${err}`});
        return;
    }

}
exports.DeletePackage = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(401).send("no id send to delete")
            return;
        }
        const id = req.params.id;
        const data = await packagedb.findByIdAndDelete({_id:id});
        if(!data){
            res.status(401).json({messsage:`error occoured while deleting`});
        }
        res.send("data deleted sucessfullt");

    } catch (err) {
        res.status(401).json({messsage:`error----------------->${err}`});
        return;
    }

}