// ----------------------------------------------Imports-----------------------------------------------------
import express from "express";
import { userIdAttachment } from "../../middlewares/userIdAttachment/userIdAttachment.js";
import { generateResult, getResults } from "../../controllers/QuizControllers/resultController.js";

// ----------------------------------------------------------------------------------------------------------

const resultRouter = express.Router();
resultRouter.route("/generateResult").post(userIdAttachment, generateResult);
resultRouter.route("/getAllResults").get(userIdAttachment, getResults);
// quizRouter.route("/getQuiz/:id").post(getQuiz);

export { resultRouter };
