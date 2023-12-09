const express = require("express");
const route = express.Router();
const {upload} = require("../middleware/multer-config");
const testimonycontroller = require("../controller/TestimonialController");
const our_team_controller = require("../controller/OurTeamController");
const videocontroller = require("../controller/VideoController");
const contactcontroller = require("../controller/ContactUsController");
const blog_controller = require("../controller/BlogController");
const photo_controller = require("../controller/PhotoController");


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



//  contact Us API
route.post("/v3/blog",blog_controller.CreateBlog);
route.get("/v3/blog",blog_controller.FindBlog);
route.delete("/v3/blog/:id",blog_controller.DeleteBlog);
route.put("/v3/blog/:id",blog_controller.UpdateBlog);



//  photos Us API
route.post("/v3/photo",upload,photo_controller.CreatePhoto);
route.get("/v3/photo",photo_controller.FindPhoto);
route.delete("/v3/photo/:id",upload, photo_controller.DeletePhoto);
route.put("/v3/photo/:id",upload, photo_controller.UpdatePhoto);





module.exports = route