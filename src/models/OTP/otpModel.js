import mongoose from "mongoose";
//Imports end
const otpSchema = new mongoose.Schema(
  {
    otp: String,
    email: String,
    expiryTime: {
      type: String,
      required:[true,"Expiry Date of otp must be provided"]
    },
  }
);

// otpSchema.index({ expire_at: 1 }, { expireAfterSeconds: 2 });

const otpModel = mongoose.model("OTP", otpSchema, "OTP");

export default otpModel;
