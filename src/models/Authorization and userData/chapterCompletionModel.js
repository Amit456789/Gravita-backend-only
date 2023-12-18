// User's Model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chapterCompletion = new Schema(
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
    chapterCompletionStatus: Number,
  },
  { timestamps: true }
);

const chapterCompletionModel = mongoose.model(
  "chapterCompletion",
  chapterCompletion,
  "chapterCompletion"
);

export default chapterCompletionModel;
