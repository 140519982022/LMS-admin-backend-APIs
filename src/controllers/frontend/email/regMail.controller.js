const nodemailer = require("nodemailer");
exports.sendMail = async(request,response)=>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        // host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "nikitakose1414@gmail.com",
            pass: "mxzrncfrgnlkhfsg",
        },
    });
      
    try {

        const info = await transporter.sendMail({
            from: '"GOV- " <nandinikose64@gmail.com>', // sender address //dont matter email send from  auth user only
            to: "nikitakose1414@gmail.com,nandinikose64@gmail.com", // list of receivers
            subject: "Chinnn😺 tapak dam👹 dam👹 👻", // Subject line
            // text: "INSTA FEVER", // plain text body
            html: "<b>Chinnn😺 tapak dam👹 dam👹 👻</b>", // html body
        });

        var res = {
            status:true,
            message:"Mail sent!!!",
        }
    
        response.send(res)
        
    } catch (error) {
        var res = {
            status:false,
            message:"Mail Not Sent",
            error_message:error
        }
    
        response.send(res)
        
    }
    

}