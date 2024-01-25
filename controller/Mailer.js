const nodemailer =  require("nodemailer");
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"aryanbaral1100@gmail.com",
        pass:"sziz tqap fdhk pesz"
    }
})
exports.sendMail = async(req, res)=>{
    try{

        let msg = {
            to:"aryalmilan23@gmail.com",
            from:"aryanbaral1100@gmail.com",
            subject:"subject",
            text:"hi milan you have been selected as a software engineer at Mama's tech with an anual income of $1M"
        }
        await transporter.sendMail(msg);
        res.send("check mail")
    }catch(err){
        res.send(err);
    }


}