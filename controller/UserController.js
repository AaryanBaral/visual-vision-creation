const userdb = require("../models/UserModel").userdb
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const image = require("../middleware/UploadFile");

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
        const data = await userdb.findByIdAndDelete({_id:req.user._id});
        if(!data){
            res.status(401).send("error while deleting user profile");
            return ;
        }
        res.status(200).send("user data deleted sucessfully");
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
        const id = req.params.id;
        let file = {};
        let imageUrl;
        const user = await userdb.findById({_id:id});
        if(req.file){
            file = {
                type:req.file.mimetype,
                buffer:req.file.buffer
            }
            if(user.imageUrl!=="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"){
                image.DeleteImage(user.imageUrl);
            }
            const snapshot = await image.UploadImage(file);
            imageUrl = snapshot.DownloadUrl;
        }
        else{
            imageUrl=user.imageUrl;
        }
        const{name,address} = req.body;
        await userdb.findByIdAndUpdate({_id:id},{
            name,
            address,
            imageUrl
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
        const data =await userdb.find().select("-password").select("-tokens");
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
        await user.save();
        return res.json({message:token});
        
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
        
    }
}
exports.IsUserLoggedIn = async(req, res)=>{
    try {
        const token = req.headers['token'];
        const verify = await jwt.verify(token ,process.env.JWT_SECERATE_KEY);
        const user = await userdb.findById({_id:verify._id}).select("-password").select("-tokens");
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
