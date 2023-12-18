import mongoose from "mongoose";
//Imports end
const otpSchema = new mongoose.Schema(
  {
    otp: String,
    email: String,
    expiryTime: {
      type: String,
      // required:[true,"Expiry Date of otp must be provided"]
    },
  },
  { timestamps: true, expireAfterSeconds: 10 }
);

// otpSchema.index({ expire_at: 1 }, { expireAfterSeconds: 2 });

const forgetPasswordOtpModel = mongoose.model(
  "ForgetPasswordOtp",
  otpSchema,
  "ForgetPasswordOtp"
);

export default forgetPasswordOtpModel;
