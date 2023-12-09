const conactdb = require("../models/ContactUsModel").contactdb;

exports.CreateContact = async(req, res)=>{
    try {
        if(!req.body){
            res.status(300).send("no data found.")
            return ;
        }
        const{description, name, email, contact} = req.body;
        const newContact = new conactdb({
            name,
            email,
            contact,
            description,
        })
        await newContact.save();
        res.json({message:"video created sucessfully."});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}

exports.DeleteContact = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(100).json({message:"no id provided"});
            return;
        }
        const id = req.params.id;
        await conactdb.findByIdAndDelete({_id:id});
        res.json({message:"video of given id deleted sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}


exports.UpdateContact = async(req,res)=>{
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
        await conactdb.findByIdAndUpdate({_id:id},{
            description, 
            videourl, 
            category,
        });
        res.json({message:"video of given id updated sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}


exports.FindContact = async(req,res)=>{
    try {
        if(req.query.id){
            const id = req.query.id;
            const data = await conactdb.findById({_id:id});
            res.json(data);
            return;
        }
        const data = await conactdb.find();
        res.json(data);
        return;        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}