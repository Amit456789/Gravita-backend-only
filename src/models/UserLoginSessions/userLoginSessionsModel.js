// ----------------------------------------------Imports-------------------------------------------------------
import mongoose from "mongoose";
import { Schema } from "mongoose";
// ------------------------------------------------------------------------------------------------------------

const loginDetailsSchema = new mongoose.Schema({

          email: String,
          loggedIn: Boolean,
          sessionId: { type: Number },

});
export const loginSessionsModel = mongoose.model("loginSessions", loginDetailsSchema, "loginSessions");
