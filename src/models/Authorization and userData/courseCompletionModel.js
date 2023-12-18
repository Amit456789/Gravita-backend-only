// User's Model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseCompletion = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
      default: null,
    },
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "chapter",
      default: null,
    },
    courseName: {
      type: String,
    },
    courseCompletionStatus: Number,
  },
  { timestamps: true }
);

const courseCompletionModel = mongoose.model(
  "courseCompletion",
  courseCompletion,
  "courseCompletion"
);

export default courseCompletionModel;
