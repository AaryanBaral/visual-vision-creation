const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var AdminModel = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})
AdminModel.pre("save", async function(next){
    console.log(this.password);
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,8);
        console.log(this.password)
    }
    next();
})
AdminModel.methods.getAuthToken= async function(){
    try {
        const token = jwt.sign({_id:this._id},process.env.JWT_SECERATE_KEY);
        this.tokens = this.tokens.concat({token});
        return token;
    } catch (err) {
        return {message:"error "}
    }
}
exports.admindb = mongoose.model('admin',AdminModel);