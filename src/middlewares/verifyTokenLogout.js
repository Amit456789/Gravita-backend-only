import jsonwebtoken from "jsonwebtoken";
import chalk from "chalk";

const jwt = jsonwebtoken;
export const verifyTokenAuthenticity = async (req, res, next) => {
  // console.log("INSIDE HE LOGOUT MIDDLEWARE")
  const cookies = req?.cookies;
  const accessToken = cookies?.ACCESS_TOKEN;
  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (error, user) => {
    try {
      if (error) {
        // console.log(
        //   chalk.green("Entered inside if jwt block of verifyLogOutToken")
        // );
        console.log(chalk.bgBlue(error));
        return res.status(403).json({
          success: false,
          message: `Unauthorized!${error} }`,
        });
      }
      // console.log(chalk.bgCyan("success"));
      next();
    } catch (error) {
      console.log(
        chalk.redBright(
          "error in verifyLogoutToken>>>>",
          error?.message || error
        )
      );
      return res.status(500).json({
        success: false,
        message: error?.message || error,
      });
    }
  });
};
