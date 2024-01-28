const userdb = require("../models/UserModel").userdb
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.CreateUser= async(req, res)=>{
    try {
        if(!req.body){
            res.status(400).json({message:"body empty"});
            return ;
        }
       const {email, password,name} = req.body;
        const newuser = new userdb({
            email, 
            password,
            name
        })
        const token = await newuser.generateAuthToken();

        const data = await newuser.save();
        if(!data){
            res.status(500).json({message:"error while saving data"});
            return ;
        }
        res.json({message:"new user saved sucessfully"})
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}

exports.DeleteUser = async(req,res)=>{
    try {
        console.log(req.user._id);
        const data = await userdb.findByIdAndDelete({_id:req.user._id})
        if(!data){
            res.status(401).send("error while deleting user profile");
            return ;
        }
        res.send("user data deleted sucessfully");
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}


exports.UpdateUser = async(req,res)=>{
    try {
        if(!req.params.id){
            res.status(400).json({message:"no id provided"});
            return;
        } 
        if(!req.body){
            res.status(400).json({message:"no information provided"});
            return;
        }
        const{email, password,name,address} = req.body;
        const id = req.params.id;
        await userdb.findByIdAndUpdate({_id:id},{
            email,
            name,
            address,
        });
        res.json({message:"user of given id updated sucessfully"});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}


exports.FindUser = async(req,res)=>{
    try {

        if(req.query.id){
            const id = req.query.id;
            const data = await userdb.findById({_id:id});
            res.json(data);
            return;
        }
        const data =await userdb.find();
        res.send(data);
        return;        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}


exports.UserLogin = async(req, res)=>{
    try {
        if(!req.body){
            res.status(400).json({message:"body empty"});
        }
        const {email, password} = req.body;
        const user = await userdb.findOne({email});
        if(!user){
            res.status(400).json({message:"invalid email"});  
            return ;          
        }
        const isMatching = await bcrypt.compare(password, user.password);
        if(!isMatching){
            res.status(400).json({message:"invalid password provided"}); 
            return ; 
        }
        const token = await user.generateAuthToken();
        user.save();
        return res.json({message:token});
        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}
exports.IsUserLoggedIn = async(req, res)=>{
    try {
        const token = req.headers['token'];

        const verify = jwt.verify(token ,process.env.JWT_SECERATE_KEY);
        const user = await userdb.findById({_id:verify._id});
        res.json({data:user});
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}

exports.UserLogout = async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((currentElement)=>{
            return currentElement.token != req.token;
        });
        await req.user.save();
        res.json({message:"Logged out sucessfully"});
    }catch(err){
        res.status(400).json(err);

    }
}
