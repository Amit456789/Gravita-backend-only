// News Routes

//------------------------------------imports----------------------------------------------
import express from "express";
import { addVideo, deleteVideo } from "../../controllers/VideoController/videoController.js";
import {
  validateMimeType,
} from "../../utils/MulterConfigsVideo/uploadVideo.js";

////////////////////////////
const videoRouter = express.Router();

// -------------------------------------------------------------------------------------------
// Video Routes

// Route to handle video uploads
videoRouter.route("/addVideo").post(validateMimeType, addVideo);

// Route to handle video deletion by ID
videoRouter.route("/deleteVideo/:id").delete(deleteVideo);

export default videoRouter;
