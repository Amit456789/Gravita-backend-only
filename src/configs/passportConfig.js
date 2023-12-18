// ---------------------------------------------Imports--------------------------------------------------------
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/Authentication/userAuthModel.js";
// ------------------------------------------------------------------------------------------------------------

export const initializePassportGoogleStrategy = () => {
  try {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
          passReqToCallback: true,
          callbackURL:
            process.env.NODE_ENV === "production"
              ? process.env.GOOGLE_OAUTH_CALLBACK_REDIRECTION_URL_PRODUCTION
              : process.env.GOOGLE_OAUTH_CALLBACK_REDIRECTION_URL_DEVELOPMENT,
        },
        async (accessToken, refreshToken, profile, params, cb) => {
          try {
            const user = await userModel?.findOne({ googleId: params?.id });
            if (!user) {
              const newUser =  new userModel({
                googleId: params?.id,
                fullName: params?.displayName,
                email: params?.["emails"]?.[0]?.["value"],
                role:"student",
                permissions:[],
                avatar:params?.["photos"]?.[0]?.["value"],
                enrollments:[]
              });

              await newUser.save();

              return cb(null, newUser);
            } else {
              return cb(null, user);
            }
          } catch (error) {
            return cb(error, false);
          }
        }
      )
    );
  } catch (error) {
    console.log(error);
  }

// serializing the user in order to create a session using the serialized id
  passport.serializeUser((user,done)=>{
    console.log('this is serialized user',user);
    done(null,user);
  });

// accessing the user after deserializing it  
  passport.deserializeUser((user,done)=>{
    console.log("this is deserialized user",user);
    done(null,user);
  });

};

