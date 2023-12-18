import express from "express";
import dotenv from "dotenv";
import { mongoConnect } from "./src/configs/mongoDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import { initializePassportGoogleStrategy } from "./src/configs/passportConfig.js";
import chalk from "chalk";
// --------------------------------------------------------------------------------------------------------

// dotenv.config - used to load the environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6500;

// mongoConnect - Connecting to mongo database
mongoConnect();

// -------------------------------------------CORS HANDLING---------------------------------------------------
// app.use(
//   cors(
//     process.env.NODE_ENV === "development"
//       ? {
//         origin: [
//           "http://localhost:3000",
//           "http://localhost:3001",
//           "http://localhost:3006",
//           "https://development.pearl-developer.com",
//           "http://178.16.137.227",
//           "http://gravitaoasis.org",
//           "https://gravitaoasis.org",
//           "https://api.gravitaoasis.org",
//           "https://admin-r4juwrel4-amit456789.vercel.app/"
//         ],
//         credentials: true,
//         methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
//         exposedHeaders: ["*", "Authorization"],
//       }
//       : {
//         origin: [
//           "http://localhost:3000",
//           "http://localhost:3001",
//           "http://localhost:3006",
//           "https://development.pearl-developer.com",
//           "http://178.16.137.227",
//           "http://gravitaoasis.org",
//           "https://gravitaoasis.org",
//           "https://api.gravitaoasis.org",
//           "http://api.gravitaoasis.org",
//           "http://admin.gravitaoasis.org",
//           "https://admin.gravitaoasis.org",
//           "https://admin-r4juwrel4-amit456789.vercel.app/"
//         ],
//         credentials: true,
//         methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
//         exposedHeaders: ["*", "Authorization"],
//       }
//   )
// );
app.use(
  cors(
    process.env.NODE_ENV === "development"
      ? {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:3006",
          "https://development.pearl-developer.com",
          "http://178.16.137.227",
          "http://gravitaoasis.org",
          "https://gravitaoasis.org",
          "https://api.gravitaoasis.org",
          "https://admin-gqxudn8oh-amit456789.vercel.app",
          "https://client-three-psi.vercel.app",
          "https://admin-blue-seven.vercel.app"
        ],
        credentials: true,
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        exposedHeaders: ["*", "Authorization"],
      }
      : {
        origin: [
          "http://localhost:3000",
          "http://localhost:3001",
          "http://localhost:3006",
          "https://development.pearl-developer.com",
          "http://178.16.137.227",
          "http://gravitaoasis.org",
          "https://gravitaoasis.org",
          "https://api.gravitaoasis.org",
          "http://api.gravitaoasis.org",
          "http://admin.gravitaoasis.org",
          "https://admin.gravitaoasis.org",
          "https://admin-gqxudn8oh-amit456789.vercel.app",
          "https://client-three-psi.vercel.app",
          "https://admin-blue-seven.vercel.app"

        ],
        credentials: true,
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
        exposedHeaders: ["*", "Authorization"],
      }
  )
);

// ---------------------------------------------------------------------------------------------------------

// -----------------------------------------Middlewares-----------------------------------------------------

// cookieParser - used to parse the cookie header and populates it to the request, keyed cookies and lets us
//                access the cookie by providing the cookie name
app.use(cookieParser());

// express.json - It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// express.urlencoded - The express.urlencoded() function is a built-in middleware function in Express.
//                      It parses incoming requests with URL-encoded payloads and is based on a body parser.
app.use(express.urlencoded({ extended: true }));

// helmet - helmet secures the express application by setting different http headers to prevent attacks like xss
app.use(helmet());

// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------

// Google Oauth Passport Handling -- Start
app.set("trust proxy", 1);

app.use(
  session({
    name: "google-oauth-session", // Default name is connect.sid
    secret: process.env.SESSION_COOKIE_ENCRYPTION_KEY,
    resave: false,
    saveUninitialized: true,
    ...(process.env.NODE_ENV === "production" && {
      cookie: {
        secure: true, // required for cookies to work on HTTPS
        httpOnly: true,
        sameSite: "none",
        maxAge: 60000, // httpOnlyCookieValidity(),
      },
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//initializePassportGoogleStrategy - configuring the goole o auth passport strategy
initializePassportGoogleStrategy();

// ---------------------------------------------------------------------------------------------------------

// --------------------------------------Routes Section Start-----------------------------------------------

// Route imports
import googleRouter from "./src/routes/auth/googleRoutes.js";
import authRouter from "./src/routes/auth/userRoutes.js";
import videoRouter from "./src/routes/Video/videoRoute.js";
import courseRouter from "./src/routes/course/courseRoutes.js";
import chapterRouter from "./src/routes/chapterRoute/chapterRoute.js";
import { quizRouter } from "./src/routes/Quiz/quizRouter.js";
import categoryRouter from "./src/routes/category/categoryRoutes.js";
import { resultRouter } from "./src/routes/Quiz/resultRouter.js";
import { courseCompletionRouter } from "./src/routes/UserData/userDataRoute.js";
import feedbackRouter from "./src/routes/feedback/feedbackRoutes.js";

// Root Route for the express app
app.get("/api/v1", (req, res) => {
  res.json("Welcome to NITESH REDDY'S LMS");
});

app.use("/api/v1/user", authRouter);


app.use("/api/v1/video", videoRouter);

// app.use("/api/v1/video", videoRouter);



app.use("/api/v1/auth/google", googleRouter);


app.use("/api/v1/course", courseRouter);


//chapter api
app.use("/api/v1/chapter", chapterRouter);

//quiz api
app.use("/api/v1/quiz", quizRouter);



app.use("/api/v1/category", categoryRouter);



//Related to results
app.use("/api/v1/result", resultRouter);

// Related to feedback
app.use("/api/v1/feedback",feedbackRouter);


// --------------------------------------------------------------------------------------------------------



// Related to course completion
app.use("/api/v1/completionStatus", courseCompletionRouter);
// --------------------------------------------------------------------------------------------------------
// Starting the express server
app.listen(PORT, () => {
  console.log(
    chalk.bold.italic.bgHex("#00FFFF")(
      `Server Started and Running at PORT ${PORT}                                                               `
    )
  );

});

// ------------------------------------------------END-------------------------------------------------------
