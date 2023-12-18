import UserModel from "../../../models/Authentication/userAuthModel.js";
import chalk from "chalk";
import jsonwebtoken from "jsonwebtoken";

import bcrypt, { hash } from "bcrypt";
import { saveAccessTokenToCookie } from "../../../utils/index.js";
import { saveIndividualLoginDetails } from "../../../utils/loginSessionDetails/loginCookies.js";
const jwt = jsonwebtoken;
// import {
//   accessTokenValidity,
//   saveAccessTokenToCookie,
// } from "../../utils/index.js";
export const loginAdmin = async (req, res) => {
  try {
    // console.log(chalk.bgRedBright(process.env.ACCESS_TOKEN_VALIDITY));
    const jwt = jsonwebtoken;
    const { loginSession } = req
    const { email, password } = req?.body;
    const { userExistence } = req?.body;
    // console.log("THis is userExistence",userExistence)
    if (userExistence?.disabled) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const passwordConfirmation = await bcrypt.compare(
      password,
      userExistence?.password
    );
    // console.log(chalk.bgCyan("This is incioming password", password));
    // console.log(
    //   chalk.bgGreen("This is hashed password", userExistence?.password)
    // );
    if (!passwordConfirmation) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }
    // accessToken - Generating Access Token
    const accessToken = jwt.sign(
      {
        id: userExistence._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_VALIDITY }
    );
    // console.log(userExistence.id);
    // Saving accessToken to the httpOnly Cookie
    saveAccessTokenToCookie(res, accessToken);
    saveIndividualLoginDetails(res, loginSession)
    // console.log("this is user id", accessToken);
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: userExistence,
    });
  } catch (error) {
    console.log(
      chalk.bgRedBright("Inside catch block of login:::::", error?.message || error)
    );
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};
