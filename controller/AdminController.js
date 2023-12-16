const admindb = require("../models/AdminModel").admindb;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.CreateAdmin= async(req, res)=>{
    try {
        if(!req.body){
            res.status(400).json({message:"body empty"});
            return ;
        }
       const {email, password} = req.body;
        const newadmin = new admindb({
            email, 
            password
        })
        const token = await newadmin.generateAuthToken();

        const data = await newadmin.save();
        if(!data){
            res.status(500).json({message:"error while saving data"});
            return ;
        }
        res.json({message:"new admin saved sucessfully"})
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}

exports.DeleteAdmin = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(400).json({message:"no id provided"});
            return;
        }
        const id = req.params.id;
        await admindb.findByIdAndDelete({_id:id});
        res.json({message:"admin of given id deleted sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}


exports.UpdateAdmin = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(400).json({message:"no id provided"});
            return;
        } 
        if(!req.body){
            res.status(400).json({message:"no information provided"});
            return;
        }
        const{email, password} = req.body;
        await admindb.findByIdAndUpdate({_id:id},{
            email,
            password
        });
        res.json({message:"blog of given id updated sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}


exports.FindAdmin = async(req,res)=>{
    try {
        if(req.query.id){
            const id = req.query.id;
            const data = await admindb.findById({_id:id});
            res.json(data);
            return;
        }
        const data = admindb.find();
        res.json(data);
        return;        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}


exports.AdminLogin = async(req, res)=>{
    try {
        if(!req.body){
            res.status(400).json({message:"body empty"});
        }
        const {email, password} = req.body;
        const admin = await admindb.findOne({email});
        if(!admin){
            res.status(400).json({message:"invalid email"});  
            return ;          
        }
        const isMatching = await bcrypt.compare(password, admin.password);
        if(!isMatching){
            res.status(400).json({message:"invalid password provided"}); 
            return ; 
        }
        const token = await admin.generateAuthToken();
        admin.save();
        res.json({message:token});
        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}
exports.IsAdminLoggedIn = async(req, res)=>{
    try {
        const token = req.headers['token'];
        const verify = jwt.verify(token ,process.env.JWT_SECERATE_KEY);
        const admin = admindb.findById({_id:verify._id});
        res.json({mesasge:"user verified"});
        return ;
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}