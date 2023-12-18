// ----------------------------------------------Imports-------------------------------------------------------

import mongoose from "mongoose";
import { Schema } from "mongoose";
// ------------------------------------------------------------------------------------------------------------

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: [true, "Course Name is a required field"],
  },
  courseDescription: {
    type: String,
    required: [true, "Course Description is a required field"],
  },
  courseThumbnail: String,
  courseCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "courseCategory",
      default: null,
    },
  ],
  courseChapters: [
    {
      type: Schema.Types.ObjectId,
      ref: "chapter",
      default: null,
    },
  ],
  courseCreatedAt: {
    type: Date,
    default: Date.now,
  },
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
  providerDetails: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: "null",
  },
  courseCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
      default: null,
    },
  ],
});

const courseModel = mongoose.model("course", courseSchema);
export default courseModel;
