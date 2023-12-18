import express from "express";
import multer from "multer";
import {
  addChapter,
  deleteChapter,
  getChapter,
  searchChapter,
  updateChapter,
} from "../../controllers/chapterController/chapterController.js";
 
const chapterRouter = express.Router();
//api to add chapter
chapterRouter.route("/addChapter").post(addChapter);
//api to get  chapter without any id specific
chapterRouter.route("/getChapter").get(getChapter);
//api to update chapter with id in params
chapterRouter.route("/updateChapter/:id").patch(updateChapter);
//api to search chapter with id in params
chapterRouter.route("/searchChapters").get(searchChapter);
//api to search chapter with id in params
chapterRouter.route("/deleteChapter/:id").delete(deleteChapter);



export default chapterRouter;
