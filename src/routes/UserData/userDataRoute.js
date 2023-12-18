// ----------------------------------------------Imports-----------------------------------------------------
import express from "express";
import { getAllStatus, videoCompletion } from "../../controllers/userDataController/userDataController.js";
import { userIdAttachment } from "../../middlewares/userIdAttachment/userIdAttachment.js";
import { checkLoginSessionStatus } from "../../middlewares/LoginSession/loginSessionCheck.js";

// ----------------------------------------------------------------------------------------------------------

const courseCompletionRouter = express.Router();
courseCompletionRouter.use(checkLoginSessionStatus)
courseCompletionRouter
  .route("/addVideoStatus")
  .post(userIdAttachment, videoCompletion);
courseCompletionRouter.route("/getAllStatus").get(userIdAttachment, getAllStatus);
// quizRouter.route("/getQuiz/:id").post(getQuiz);

export { courseCompletionRouter };
