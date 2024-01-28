const userdb = require("../models/UserModel").userdb
const jwt = require("jsonwebtoken");
const UserAuth = async(req, res, next)=>{
    try {
        const token = req.headers['token'];
        const verify = jwt.verify(token ,process.env.JWT_SECERATE_KEY);
        const user = await userdb.findById({_id:verify._id});
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}

module.exports = UserAuth;