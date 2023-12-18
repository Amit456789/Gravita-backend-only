// News Routes

//------------------------------------imports----------------------------------------------
import express from "express";

//Importing News Controller


// ------------------------------------------------------------------------------------------


//Importing

import {
  addUser,
  getIndividualUser,
  loginUser,
  logout,
  refreshToken,
  resetPassword,
  sendOtp,
  updateUser,
  usersList,
} from "../../controllers/AuthControllers/userAuthController.js";
import { humanVerification } from "../../utils/CaptchaVerification/googleApiCaptcha.js";
import {mediaUpload}  from "../../middlewares/mediaUpload.js";
import {
  forgetPasswordSendOtp,
  verifyOtp,
} from "../../controllers/MailController/mail.js";
import { verifyOtpController } from "../../controllers/AuthControllers/verifyOtpController.js";
import { verifyUserTokenMiddleware } from "../../middlewares/verifyTokenMiddleware.js";
import { verifyTokenAuthenticity } from "../../middlewares/verifyTokenLogout.js";
import { loginAdmin } from "../../controllers/AuthControllers/AdminController/adminAuth.js";
import { verifyAdminMiddleware } from "../../middlewares/verifyAdminMiddleware/verifyAdminMiddleware.js";
import { userStatus } from "../../middlewares/userCurrentStatus/userStatusCheck.js";
import { userLoginStatus } from "../../middlewares/LoginSession/loginSession.js";
import { checkLoginSessionStatus } from "../../middlewares/LoginSession/loginSessionCheck.js";

////////////////////////////
const authRouter = express.Router();
// -------------------------------------------------------------------------------------------

//For sign up
authRouter.route("/sendOtp").post(sendOtp);

//Sign up with otp and other data to add user in the db.
//This controller does not only add users but meanwhile verifies the otp 
//Addding user along with the otp inside formData.
authRouter.route("/addUser").post(mediaUpload("avatar"), addUser);



//Captcha verification
//human verification is for google recaptcha
authRouter.route("/login").post(userLoginStatus, loginUser);


//Login route for admin panel
//seperate routes because of seperate UI.
authRouter
  .route("/loginAdmin")
  .post(userLoginStatus, verifyAdminMiddleware, loginAdmin);


//This will send otp for forget password
//Payload : {email}
//From the login page if we forget the password,then this route will be there
authRouter.route("/forgetPasswordSendOtp").post(forgetPasswordSendOtp);


// Verify otp after filling otp for forget password, this  needs email and otp
//Payload : {otp,email}
authRouter.route("/verifyOtp").post(verifyOtpController);


// last step to change password
//Payload = {email,otp,password,confirmPassword}
authRouter.route("/resetPassword").post(verifyOtp, resetPassword);



//logout post API
//output --> Clear cookies with this API.
authRouter.route("/logout").post(verifyTokenAuthenticity, logout);


authRouter.route("/refreshToken").post(refreshToken);



//Protected with disabled
//2 Middlewares one is to check the user token status and anothe rone is to check that is it the admin or not
authRouter
  .route("/getUsers")
  .get(userStatus, verifyUserTokenMiddleware, usersList);


// authRouter.route("/searchUser").get(verifyUserTokenMiddleware, usersList);
//To update the user
authRouter
  .route("/updateUser/:id")
  .patch(verifyTokenAuthenticity, checkLoginSessionStatus, mediaUpload("avatar"), updateUser);


//To Get the individual user
authRouter
  .route("/getIndividualUser/:id")
  .get(verifyTokenAuthenticity, checkLoginSessionStatus, getIndividualUser);

export default authRouter;
