import jsonwebtoken from "jsonwebtoken";
import { ObjectId } from "mongodb";
import bcrypt, { hash } from "bcrypt";
// Generate a new ObjectId
import chalk from "chalk";
import UserModel from "../../models/Authentication/userAuthModel.js";
import { loginSessionsModel } from "../../models/UserLoginSessions/userLoginSessionsModel.js";

const jwt = jsonwebtoken;

export const userLoginStatus = async (req, res, next) => {
          // console.log("Entered inside user status ");
          try {
                    const { email, password } = req?.body;
                    //A connection to the db so that we can confirm the password

                    const userPasswordMatch = await UserModel.find({ email }).select('password')



                    //If no such email id exists in the data base
                    if (userPasswordMatch.length === 0) {
                              return res.status(400).json({
                                        success: false,
                                        message: "Invalid email id and password",
                              });
                    }


                    const passwordConfirmation = await bcrypt.compare(
                              password,
                              userPasswordMatch[0]?.password
                    );
                    // console.log("This is password", userPasswordMatch)
                    if (!passwordConfirmation) {
                              return res.status(400).json({
                                        success: false,
                                        message: "Invalid email id and password",
                              });
                    }

                    //
                    const currentUserStatus = await loginSessionsModel.find({ email });
                    // console.log("This is current status", currentUserStatus)
                    if(req?.body?.forcedLogin){
                              // console.log("Entered inside if block")
                              // console.log(newObjectId);
                              const random = Math.floor(Math.random() * 10000000 + 10000000);
                              const dates = +Date.now();
                              const updateLoginSession = await loginSessionsModel.findOneAndUpdate(
                                        { email },
                                        { sessionId: random + dates },
                                        { new: true }
                              );
                              // console.log("Update Login session", updateLoginSession)
                              req.loginSession = [email, updateLoginSession?.sessionId];
                              req.sessionId = random + dates;
                              return next();
                              // return
                    } else {
                              if (currentUserStatus?.length > 0) {
                                        return res.status(409).json({
                                                  success: false,
                                                  message: "The user is logged in from some other device",
                                        });
                              }
                              // const newObjectId = new ObjectId();
                              // console.log(newObjectId);
                              const random = Math.floor(Math.random() * 10000000 + 10000000);
                              const dates = +Date.now();
                              const saveLoginSession = loginSessionsModel({
                                        email,
                                        sessionId: random + dates,
                              });
                              await saveLoginSession.save();
                              // console.log("This is _id", saveLoginSession?._id)
                              req.loginSession = [email, saveLoginSession?.sessionId];
                              req.sessionId = random + dates;
                              return next();
                    }
          } catch (error) {
                    console.log(
                              chalk.bgBlueBright("Inside catch block of userLoginStatus+++++", error?.message || error)
                    );
                    return res.status(400).json({
                              success: false,
                              message: error?.message || error,
                    });
          }
};
