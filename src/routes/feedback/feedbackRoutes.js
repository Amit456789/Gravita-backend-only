// -----------------------------------------------Imports-----------------------------------------------
import { Router } from "express";
import {sendFeedback} from "../../controllers/FeedbackController/feedbackController.js"
// -----------------------------------------------------------------------------------------------------

const router = Router();

// -----------------------------------------------------------------------------------------------------


// POST --  route to send the feedback mail
router.route("/")
        .post(sendFeedback); 

export default router;
