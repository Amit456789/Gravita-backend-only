// ----------------------------------------------Imports-----------------------------------------------------
import express from "express";
import {
  addQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuiz,
  searchQuiz,
  updateQuiz,
} from "../../controllers/QuizControllers/quiz.js";
// ----------------------------------------------------------------------------------------------------------

const quizRouter = express.Router();
//user verification  is needed here  with a middleware
quizRouter.route("/addQuiz").post(addQuiz);
//get all quizzes
quizRouter.route("/addQuiz").get(getAllQuizzes);
quizRouter.route("/getQuiz/:id").get(getQuiz);
quizRouter.route("/updateQuiz/:id").patch(updateQuiz);
quizRouter.route("/deleteQuiz/:id").delete(deleteQuiz);
quizRouter.route("/searchQuizzes").get(searchQuiz);

export { quizRouter };
