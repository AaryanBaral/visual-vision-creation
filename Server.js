//  all header files included
const express = require("express");
const body_parser = require("body-parser");
const cookie = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config({path: "./configure/config.env"});
const sessoin = require("express-session");
const databse = require("./connection/Connection");
const Route = require("./routes/Router");




// initializing express in a variable
const app = express();


// cross origin credentials
app.use(cors({
    origin:"*"
}))


// body-parser authorizaton 
app.use(body_parser.urlencoded({extended:true}));



// cookie
app.use(cookie());


// sessoins
app.use(sessoin({
    resave:false,
    saveUninitialized:false,
    secret:"holaolaholaolaholaola"
}))


// database connection
databse.connectDb();


// home page api
app.get("/", (req,res)=>{
    res.send("home page");
})


// routing the apis 
app.use("/",Route)







// running the server on port
app.listen(3000,()=>{
    console.log("Running on port 3000");

})


