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
        res.json({message:"contact created sucessfully."});
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
        res.json({message:"contact of given id deleted sucessfully"});
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
        const id = req.params.id;
        const{description, name, email, contact} = req.body;
        await conactdb.findByIdAndUpdate({_id:id},{
            description, 
            name, 
            email,
            contact
        });
        res.json({message:"contact of given id updated sucessfully"});
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