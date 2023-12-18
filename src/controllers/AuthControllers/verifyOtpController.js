// @desc - to verify the otp sent to the specified email
// @route - POST /mail/verifyOtp
// @access - PUBLIC

import moment from "moment";
import forgetPasswordOtpModel from "../../models/OTP/forgetPasswordOtp.js";

export const verifyOtpController = async (req, res) => {
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
    const otpDoc = await forgetPasswordOtpModel.findOne({ email, otp })
    // console.log("This is otpDoc", otpDoc)
    if (!otpDoc) {
      return res
        .status(400)
        .json({ success: false, message: "OTP is Incorrect" });
    }

    // currentDate - holds the current date
    const currentDate = moment()
    const storedTime = moment(otpDoc?.expiryTime, 'YYYY-MM-DD HH:mm:ss');


    const timeFlag = storedTime.isAfter(currentDate);
    // console.log("This is time flag",timeFlag)
    if (!timeFlag) {
      await forgetPasswordOtpModel.deleteMany({ email, otp })
      return res.status(400).json({
        success: false,
        message: `OTP EXPIRED`,
      });
    }
    await forgetPasswordOtpModel.deleteMany({ email, otp })
    return res
      .status(200)
      .json({ success: true, message: "OTP Successfully validated" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
