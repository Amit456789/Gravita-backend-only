// ------------------------------------------Imports----------------------------------------------
import nodemailer from "nodemailer"

// -----------------------------------------------------------------------------------------------

// feedbackMail -- function to send the feedback mail
export const feedbackMail = (senderName,senderMail,feedbackContent)=>{
    try{
        
        // transporter -- configuration of the nodemailer
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            service:"gmail",
            auth:{
                user:process.env.NODEMAILER_MAIL,
                pass:process.env.NODEMAILER_MAIL_PASSWORD
            }
        });

        // mailOptions -- details of the sender and reciever
        const mailOptions = {
            from:`${senderName} sent through <foo@blurdybloop.com>`,
            to:process.env.FEEDBACK_MAIL,
            subject:`Feedback of LMS from ${senderName}`,
            html:`<p>${feedbackContent}</p>`
        }

        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    return reject(error)
                }else{
                    return resolve("Feedback sent successfully")
                }
            })
        })


    }catch(error){
        console.log(error.message);
    }
}