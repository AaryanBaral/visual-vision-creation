const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var UserModel = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        default:"",
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})
UserModel.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
})

UserModel.methods.generateAuthToken = async function(){
    try {
        const token =  jwt.sign({_id:this._id},process.env.JWT_SECERATE_KEY);
        this.tokens = this.tokens.concat({token});
        return token;
    } catch (err) {
        return {message:"error "}
    }
}

exports.userdb = mongoose.model('user',UserModel);