import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/Authentication/userAuthModel.js";
import chalk from "chalk";

const jwt = jsonwebtoken;

export const verifyUserTokenMiddleware = async (req, res, next) => {
  try {
    const cookies = req?.cookies;
    const access_token = cookies?.ACCESS_TOKEN;
    if (!access_token) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Please Check Your Login Credentials",
      });
    }

    jwt.verify(
      access_token,
      process.env.JWT_SECRET_KEY,
      async (error, user) => {
        try {
          if (error) {
            console.log(chalk.green("Entered inside if jwt block"));
            console.log(chalk.bgBlue(error));
            return res.status(403).json({
              success: false,
              message: "Unauthorized! Please Check Your Login Credentials",
            });
          }
          const id = user?.id;
          const userIdentification = await UserModel.findOne({
            _id: id,
          });
          // console.log(userIdentification?.role);
          // console.log(
          //   chalk.bgCyanBright(
          //     userIdentification?.role?.trim() != "SUPER_ADMIN"
          //   )
          // );
          if (
            userIdentification?.role !== "ADMIN" &&
            userIdentification?.role !== "SUPER_ADMIN"
          ) {
            console.log(
              chalk.green("Entered inside if userIdentification block")
            );
            return res.status(403).json({
              success: false,
              message: "Unauthorized! ",
              data: [],
            });
          } // If everything is fine, continue to the next middleware or route handler.
          req.userId = id;
          next();
        } catch (error) {
          console.log(chalk.green("Entered inside catch block"));
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
      message: error.message || error,
    });
  }
};
