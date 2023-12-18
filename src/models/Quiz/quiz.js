// ----------------------------------------------Imports-------------------------------------------------------

import mongoose from "mongoose";
import { Schema } from "mongoose";
// ------------------------------------------------------------------------------------------------------------

const quizSchema = new Schema({
  question: String,
  options: [
    {
      option: String,
      isCorrect: Boolean,
    },
  ],
  chapterId: {
    type: Schema.Types.ObjectId,
    ref: "chapter",
  },
});
const quizModel = mongoose.model("quiz", quizSchema, "quiz");
export { quizModel };
