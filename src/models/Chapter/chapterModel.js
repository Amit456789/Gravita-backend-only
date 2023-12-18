// ----------------------------------------------Imports-------------------------------------------------------
import mongoose from "mongoose";
import { Schema } from "mongoose";
// ------------------------------------------------------------------------------------------------------------

const chapterSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    default: null,
  },
  chapterName: {
    type: String,
    required: [true, "Chapter Name is a required field"],
  },
  chapterDescription: {
    type: String,
    required: [true, "Chapter Description is a required field"],
  },
  chapterVideos: [
    {
      type: Schema.Types.ObjectId,
      ref: "videos",
      default: null,
    },
  ],
  chapterQuizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "quiz",
      default: null,
    },
  ],
  rating: {
    type: Number,
    default: null,
  },
  review: [
    {
      userId: Schema.Types.ObjectId,
      review: String,
      likes: Number,
      dislikes: Number,
    },
  ],
  chapterCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const chapterModel = mongoose.model("chapter", chapterSchema, "chapter");
export default chapterModel;
