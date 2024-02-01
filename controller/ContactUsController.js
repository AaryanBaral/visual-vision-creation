const conactdb = require("../models/ContactUsModel").contactdb;
const nodemailer =  require("nodemailer");
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"aryanbaral1100@gmail.com",
        pass:"sziz tqap fdhk pesz"
    }
})



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
        const data = await newContact.save();
        if(!data){
            res.status(300).json({message:"error"});
            return ;
        }
        let msg = {
            to:`${email}`,
            from:"aryanbaral1100@gmail.com",
            subject:"new contact posted",
            text:`Hi admin a user named ${name} contact number ${contact}, has aspired you to contact them saying '${description}' `
        }
        await transporter.sendMail(msg);
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
        const data = await conactdb.findByIdAndDelete({_id:id});
        if(!data){
            res.status(300).json({message:"contact of given id not found"});
            return;
        }
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
        const data = await conactdb.findByIdAndUpdate({_id:id},{
            description, 
            name, 
            email,
            contact
        });
        if(!data){
            res.status(300).json({message:"contact of given id not found"});
            return ;
        }
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