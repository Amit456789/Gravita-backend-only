import UserModel from "../../models/Authentication/userAuthModel.js";

export const verifyAdminMiddleware = async (req, res, next) => {
  const { email, password } = req?.body;
  const userExistence = await UserModel.findOne({ email })
  if (userExistence?.length === 0) {
    return res.status(400).json({
      success: false,
      message: `Email Id does not exist`,
    });
  }
  if (
    userExistence.role == "SUPER_ADMIN" ||
    userExistence.role == "ADMIN" ||
    userExistence.role == "TEACHER"
  ) {
    req.body.userExistence = userExistence;
   return next();
  }

  return res.status(400).json({
    success: false,
    message: "Unauthorized Access",
  });
};
