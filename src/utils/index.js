import dotenv from "dotenv";

// validities
const accessTokenValidity = "60m";
const refreshTokenValidity = "15d";

// dotenv.config - used to load the environment variables
dotenv.config();
// ----------------------------------------------------------------------------------------

// httpOnlyCookieValidity - setting the validity for http only cookie
const httpOnlyCookieValidity = () => {
  let currentDate = new Date();
  return new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days validity
};

// saveAccessTokenToCookie - this method saved the access token to the http only cookie
const saveAccessTokenToCookie = (res, token) => {
  return res.cookie("ACCESS_TOKEN", token, {
    httpOnly: true,
    expires: httpOnlyCookieValidity(),
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  });
};

// -----------------------------------------------------------------------------------------------------

// generateOtp - method to generate random 6 digit otp
const generateOtp = () => {
  const otp = Math.floor(Math.random() * 900000 + 100000);
  return otp;
};

export {
  saveAccessTokenToCookie,
  generateOtp,
  accessTokenValidity,
  refreshTokenValidity,
};
// export {
//   saveAccessTokenToCookie,
//   generateOtp,
//   process.env.accessTokenValidity,
//   process.env.refreshTokenValidity,
// };
// -----------------------------------------------------------------------------------------------------
