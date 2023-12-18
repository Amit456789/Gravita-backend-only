// ----------------------------------------------Imports-------------------------------------------------------
import mongoose from "mongoose";
import { Schema } from "mongoose";
// ------------------------------------------------------------------------------------------------------------

const videoSchema = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "course", default: null },
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "chapter",
    default: null,
  },
  videoLink: {
    type: String,
    // required: [true, "Video Link is a required field"],
  },
  videoTitle: {
    type: String,
    // // required: [true, "Video Title is a required field"],
  },
  videoDescription: {
    type: String,
    // // required: [true, "Video Description is a required field"],
  },
  videoGoogleCloudDetails:[{}],
  thumbnail: {
    type: String,
    default: null,
  },
});
export const videoModel = mongoose.model("videos", videoSchema, "videos");
