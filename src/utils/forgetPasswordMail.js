// ----------------------------------------------imports------------------------------------------------
import nodemailer from "nodemailer";
// -----------------------------------------------------------------------------------------------------

// sendMail - this method is used to send mail
export const sendMail = (email, otp) => {
  // transporter - configuration of admin/user to send mail from
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });

  //   mailOptions - details of the user to whom the mail needs to be delievered
  let mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: "NITISH LMS Forget Password OTP",
    html: `<h1>OTP - ${otp}</h1>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      } else {
        return resolve("Otp Sent Successfully" + info.response);
      }
    });
  });
};
