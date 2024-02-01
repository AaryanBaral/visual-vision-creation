const express = require("express");
const route = express.Router();
const {upload} = require("../middleware/multer-config");
const testimonycontroller = require("../controller/TestimonialController");
const our_team_controller = require("../controller/OurTeamController");
const videocontroller = require("../controller/VideoController");
const contactcontroller = require("../controller/ContactUsController");
const blog_controller = require("../controller/BlogController");
const photo_controller = require("../controller/PhotoController");
const admin_controller = require("../controller/AdminController");
const package_controller = require("../controller/CustomPackageController");
const mail_controller = require("../controller/Mailer");
const AdminAuth = require("../middleware/adminAuth");
const UserAuth = require("../middleware/userAuth");
const user_controller = require("../controller/UserController")
const { Router } = require("express");



route.get("/",(req,res)=>{
    res.send("home page");
})



// cookie apis

route.get("/setcookie",(req,res)=>{
    res.cookie("cookie",25);
    console.log(req.cookies)
    res.send("cookie set sucesfully.")
})
route.get("/deletecookie",(req, res)=>{
    res.clearCookie('cookie');
    res.send("cookie deleted sucessfully");
})
route.get("/viewcookie",(req,res)=>{
    res.json(req.cookies)
})




// sessions apis
route.get("/setsessions",(req,res)=>{
    req.session.myage = 25;
    res.send("session set sucesfully.")
})
route.get("/deletesessions",(req, res)=>{
    req.session.destroy(function (err){
        if (err) throw err; 
        res.send("session deleted sucessfully");
    });
})
route.get("/viewsessions",(req,res)=>{
    res.json(req.session)
})







// Testimony API 
route.post("/v3/testimony",upload,testimonycontroller.CreateTestimony);
route.get("/v3/testimony",testimonycontroller.FindTestimony);
route.delete("/v3/testimony/:id",upload,testimonycontroller.DeleteTestimony);
route.put("/v3/testimony/:id",upload,testimonycontroller.UpdateTestimony);



// Our Team API
route.post("/v3/ourteam",upload,our_team_controller.CreateOurTeam);
route.get("/v3/ourteam",our_team_controller.FindOurTeam);
route.delete("/v3/ourteam/:id",upload,our_team_controller.DeleteOurTeam);
route.put("/v3/ourteam/:id",upload,our_team_controller.UpdateOurTeam);



// Video API
route.post("/v3/video",videocontroller.CreateVideo);
route.get("/v3/video",videocontroller.FindVideo);
route.delete("/v3/video/:id",videocontroller.DeleteVideo);
route.put("/v3/video/:id",videocontroller.UpdateVideo);


//  contact Us API
route.post("/v3/contact",contactcontroller.CreateContact);
route.get("/v3/contact",contactcontroller.FindContact);
route.delete("/v3/contact/:id",contactcontroller.DeleteContact);
route.put("/v3/contact/:id",contactcontroller.UpdateContact);



//  blog Us API
route.post("/v3/blog",blog_controller.CreateBlog);
route.get("/v3/blog",blog_controller.FindBlog);
route.delete("/v3/blog/:id",blog_controller.DeleteBlog);
route.put("/v3/blog/:id",blog_controller.UpdateBlog);



//  photos Us API
route.post("/v3/photo",upload,photo_controller.CreatePhoto);
route.get("/v3/photo",photo_controller.FindPhoto);
route.delete("/v3/photo/:id",upload, photo_controller.DeletePhoto);
route.put("/v3/photo/:id",upload, photo_controller.UpdatePhoto);



//  Package API
route.post("/v3/package",package_controller.CreatePackage);
route.get("/v3/package",package_controller.FindPackage);
route.delete("/v3/package/:id", package_controller.DeletePackage);




//  Admin Us API
route.post("/v3/admin",admin_controller.CreateAdmin);
route.get("/v3/admin",admin_controller.FindAdmin);
route.delete("/v3/admin/",AdminAuth, admin_controller.DeleteAdmin);
route.put("/v3/admin/:id",admin_controller.UpdateAdmin);
route.post("/v3/adminLogin",admin_controller.AdminLogin);
route.post("/v3/adminLogout",AdminAuth,admin_controller.AdminLogout);
route.get("/v3/admin/individual",admin_controller.IsAdminLoggedIn);




//  User API
route.post("/v3/user",user_controller.CreateUser);
route.get("/v3/user",user_controller.FindUser);
route.delete("/v3/user/",UserAuth, user_controller.DeleteUser);
route.put("/v3/user/:id",user_controller.UpdateUser);
route.post("/v3/userLogin",user_controller.UserLogin);
route.post("/v3/userLogout",UserAuth,user_controller.UserLogout);
route.get("/v3/user/individual",user_controller.IsUserLoggedIn);




// for mailing.........
route.get("/v3/mail", mail_controller.sendMail);




// auth otp using gmail



module.exports = route