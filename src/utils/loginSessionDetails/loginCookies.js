import dotenv from "dotenv";

// dotenv.config - used to load the environment variables
dotenv.config();
// ----------------------------------------------------------------------------------------

// httpOnlyCookieValidity - setting the validity for http only cookie
const httpOnlyCookieValidity = () => {
          let currentDate = new Date();
          return new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days validity
};

// saveAccessTokenToCookie - this method saved the access token to the http only cookie
const saveIndividualLoginDetails = (res, payload) => {
          return res.cookie("LOGIN_STATUS", payload, {
                    httpOnly: true,
                    expires: httpOnlyCookieValidity(),
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
                    ...(process.env.NODE_ENV === "production" && { secure: true }),
          });
};

// -----------------------------------------------------------------------------------------------------


export {
          saveIndividualLoginDetails
};

// -----------------------------------------------------------------------------------------------------
