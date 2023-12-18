// ----------------------------------------------Imports-------------------------------------------------------

import mongoose from "mongoose";
import { Schema } from "mongoose";
// ------------------------------------------------------------------------------------------------------------

const resultSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is a required field"],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  chapterQuizScore: [
    {
      chapterId: {
        type: Schema.Types.ObjectId,
        ref: "chapter", // Reference to the Quiz
      },
      score: {
        type: Number,
        default: 0, // Set a default value or modify as needed
      },
    },
  ],
  attempt: {
    type: Number,
    default: 0,
  },
  result: {
    type: Number,
    default: 0,
  },
  scoreCard: [
    {
      quiz: {
        type: Schema.Types.ObjectId,
        ref: "quiz", // Reference to the Quiz
      },
      score: {
        type: Number,
        default: 0, // Set a default value or modify as needed
      },
    },
  ],
  best: Number,
  totalQuestions: {
    type: Number,
  },
});
const resultModel = mongoose.model("result", resultSchema, "result");
export { resultModel };
