const admindb = require("../models/AdminModel").admindb;
const jwt = require("jsonwebtoken");
const AdminAuth = async(req, res, next)=>{
    try {
        const token = req.headers['token'];
        const verify = jwt.verify(token ,process.env.JWT_SECERATE_KEY);
        const admin = await admindb.findById({_id:verify._id});
        console.log(admin)
        req.token = token;
        req.admin = admin;
        next();
    } catch (err) {
        res.status(500).json(`error occoured ------> ${err}`);
    }
}

module.exports = AdminAuth;