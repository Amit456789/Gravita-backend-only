import jsonwebtoken from "jsonwebtoken";

import chalk from "chalk";
import UserModel from "../../models/Authentication/userAuthModel.js";

const jwt = jsonwebtoken;

export const userStatus = async (req, res, next) => {
  // console.log("Entered inside user status ");
  try {
    const cookies = req?.cookies;
    const access_token = cookies?.ACCESS_TOKEN;
    // console.log("this is access token", access_token);
    if (!access_token) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Please Check Your Login Credentials",
      });
    }

    // console.log("This is access token", access_token);
    jwt.verify(
      access_token,
      process.env.JWT_SECRET_KEY,
      async (error, user) => {
        try {
          if (error) {
            console.log(chalk.green("Entered inside if(error) jwt block"));
            console.log(error?.message ?? error);
            return res.status(403).json({
              success: false,
              message: "Unauthorized! Please Check Your Login Credentials",
            });
          }
          const id = user?.id;
          const userIdentification = await UserModel.findOne(
            { _id: id },
            { isDisabled: 1, assignedCategories: 1, _id: 1, role: 1 }
          );
          // console.log("dfsd", userIdentification);
          if (userIdentification.disabled) {
            return res.status(440).json({
              success: false,
              message: "Unauthorized Access! Contact Admin ",
            });
          } // If everything is fine, continue to the next middleware or route handler.
          req.providerDetails = id;
          req.assignedCategories = userIdentification?.assignedCategories;
          req.role = userIdentification?.role;

          // console.log(
          //   "these are the assigned categories",
          //   userIdentification?.assignedCategories
          // );
          return next();
        } catch (error) {
          console.log(
            chalk.green("Entered inside catch block of userStatusCheck")
          );
          return res.status(403).json({
            success: false,
            message: error.message || error,
          });
        }
      }
    );
  } catch (error) {
    console.log(chalk.green("Entered inside catch block"));
    return res.status(403).json({
      success: false,
      message: error?.message || error,
    });
  }
};
