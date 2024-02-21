//  all header files included
const dotenv = require("dotenv").config({path: "./configure/config.env"});
const express = require("express");
const body_parser = require("body-parser");
const cookie = require("cookie-parser");
const sessoin = require("express-session");
const databse = require("./connection/Connection");
const Route = require("./routes/Router");
const cors = require("cors");



// ******************************** Use Helmet for http header security********************





// initializing express in a variable
const app = express();


// cross origin credentials
app.use(cors({origin:["http://localhost:3000", "http://localhost:3002","http://localhost:3001", "https://localhost:3000", "https://localhost:3001"],credentials:true,methods:["GET","HEAD","PUT","PATCH","POST","DELETE"],preflightContinue:false}))


// body-parser authorizaton 
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());



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


