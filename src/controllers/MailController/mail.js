// ------------------------------------------Imports---------------------------------------------------------

import validator from "validator";
import forgetPasswordOtpModel from "../../models/OTP/forgetPasswordOtp.js";
import { sendMail } from "../../utils/forgetPasswordMail.js";
import UserModel from "../../models/Authentication/userAuthModel.js";
import moment from "moment";

// -----------------------------------------------------------------------------------------------------------

// @desc - to send the otp to the specified email
// @route - POST /mail/sendOtp
// @access - PUBLIC
export const forgetPasswordSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    // validating email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // currentDate - holds the current date
    // const currentDate = moment();
    // deleting the expired otp
    // await forgetPasswordOtpModel.deleteMany({
    //   expiresAt: { $lt: currentDate },
    // });
    //
    const user = await UserModel.find({ email });
    if (user.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "This mail does not exists" });
    }
    // otp - generating random otp
    const otp = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
    sendMail(email, otp)
      .then(async () => {
        const currentTime = moment();
        const expiryTime = currentTime.add(2, 'minutes');
        // Format the current time as a string
        const formattedTime = expiryTime.format('YYYY-MM-DD HH:mm:ss');

        const otpDoc = await forgetPasswordOtpModel.findOneAndUpdate(
          { email },
          { otp, expiryTime: formattedTime },
          { upsert: true }
        );
        return res.status(200).json({
          success: true, message: "OTP sent successfully"
        });
        //   if (!otpDoc) {
        //     let doc = new forgetPasswordOtpModel({
        //       email,
        //       otp,
        //       expiresAt: new Date(Date.now() + 60000), //expiry time of otp 60s
        //     });
        //     doc.save().then(() => {
        //       return res
        //         .status(200)
        //         .json({ success: true, message: "OTP sent successfully" });
        //     });
        //   } else {
        //     return res
        //       .status(200)
        //       .json({ success: true, message: "OTP sent successfully" });
        //   }
      })
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: `Unable to send mail! ${error.message}`,
        });
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

// @desc - to verify the otp sent to the specified email
// @route - POST /mail/verifyOtp
// @access - PUBLIC

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request! Email is required" });
    }

    if (!otp) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request! OTP is required" });
    }

    const otpDoc = await forgetPasswordOtpModel.findOne({
      $and: [{ email }, { otp }],
    });

    if (!otpDoc) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is Incorrect" });
    }

    // currentDate - holds the current date
    const currentDate = new Date();
    const otpExpiryDate = otpDoc.expiresAt;

    if (currentDate > otpExpiryDate) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is expired" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
