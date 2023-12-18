// -----------------------------------------------Imports---------------------------------------------------------
import passport from "passport";
import express from "express";
import { googleLogin, googleLogout } from "../../controllers/AuthControllers/googleAuthController.js";
// ---------------------------------------------------------------------------------------------------------------

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: `http://localhost:3000`,
    failureRedirect: `http://localhost:3000/failure`,
  })
);

router.route("/login/success")
    .get(googleLogin);

router.route("/logout")
    .get(googleLogout);

export default router;
