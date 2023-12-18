// News Routes

//------------------------------------imports----------------------------------------------
import express from "express";
import { humanVerification } from "../../utils/CaptchaVerification/googleApiCaptcha.js";

//Importing News Controller

// ------------------------------------------------------------------------------------------
//Importing

////////////////////////////
const captchaRouter = express.Router();

captchaRouter.route("/").post(humanVerification);
export { captchaRouter };
