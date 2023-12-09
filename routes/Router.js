const express = require("express");
const route = express.Router();
const {upload} = require("../middleware/multer-config");
const practicecontroller = require("../controller/PracticeController");
const testimonycontroller = require("../controller/TestimonialController");
const our_team_controller = require("../controller/OurTeamController");




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




module.exports = route