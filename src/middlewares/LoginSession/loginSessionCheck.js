import chalk from "chalk";
import { loginSessionsModel } from "../../models/UserLoginSessions/userLoginSessionsModel.js";

export const checkLoginSessionStatus = async (req, res, next) => {
          try {
                    const cookies = req?.cookies;
                    const loginSession = cookies?.LOGIN_STATUS;
                    // console.log("This is loginSession", loginSession)
                    if (!loginSession || loginSession.length == 0) {
                              return res.status(400).json({
                                        success: false,
                                        message: "You need to log in first",
                              });
                    }
                    // console.log(chalk.bgCyanBright("Here comes the login session"),loginSession)
                    const [email, sessionId] = loginSession
                    const userSessionCheck = await loginSessionsModel.findOne({ email })//Output is an object
                    // console.log("This is userSessionId", userSessionCheck)
                    // console.log("This is userSessionId", userSessionCheck?.sessionId === sessionId)
                    if (userSessionCheck?.sessionId === sessionId) {
                              // console.log("This is loginSession insde if", userSessionCheck?.sessionId)
                              // console.log("This is loginSession insde if 2nd statement", sessionId)
                              return next()

                    } else {
                              // console.log("Unauth")
                              // res.clearCookie("ACCESS_TOKEN");
                              // res.clearCookie("LOGIN_STATUS");
                              res.status(440).json({
                                        success: false,
                                        message: "Auto Log out",
                              });
                    }

                    // console.log("UnUTHORIZED")
          } catch (error) {
                    return res.status(400).json({
                              success: false,
                              message: error?.message || error,
                    });
          }
}