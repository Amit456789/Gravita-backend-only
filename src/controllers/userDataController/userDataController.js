// // ---------------------------------------------Imports-------------------------------------------------
// import UserModel from "../../models/Authentication/userAuthModel.js";
// import userDataModel from "../../models/Authorization and userData/userData.js";
// import courseModel from "../../models/Course/courseModel.js";

import chalk from "chalk";
import chapterCompletionModel from "../../models/Authorization and userData/chapterCompletionModel.js";
import videoCompletionModel from "../../models/Authorization and userData/userData.js";
import chapterModel from "../../models/Chapter/chapterModel.js";
import courseModel from "../../models/Course/courseModel.js";
import { videoModel } from "../../models/Video/videoModel.js";
import { courseCompletionRouter } from "../../routes/UserData/userDataRoute.js";
import courseCompletionModel from "../../models/Authorization and userData/courseCompletionModel.js";

export const videoCompletion = async (req, res) => {
  try {
    const { chapterId, courseId, videoId } = req?.body;
    const { userId } = req;
    const payload = {
      userId,
      chapterId,
      courseId,
      videoId,
      videoCompletionStatus: 100,
    };

    const courseDoc = await courseModel.findById({ _id: courseId });

    //Calculation initited fort videos----------------------------------
    const videoExistance = await videoCompletionModel.find({
      videoId,
      userId,
      chapterId,
      courseId,
    });
    if (videoExistance.length !== 0) {
      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
      });
    }
    //This logic is to take care of the video Completion
    const videoCompletion = new videoCompletionModel(payload);
    await videoCompletion.save();
    //---------------------Ends here-----------------------

    //Finding out how many videos are there inside a course
    const chapterLinkedVideos = await videoModel.find({ chapterId });
    const totalAssociatedVideosToChapter = chapterLinkedVideos?.length;
    const completedVideos = await videoCompletionModel.find({
      chapterId,
      userId,
    });
    //     console.log("A bit aboe ", totalAssociatedVideosToChapter);
    const completedChapters =
      (completedVideos?.length / totalAssociatedVideosToChapter) * 100

    //     console.log("This is value of completed chapters", completedChapters);
    const chapterPayload = {
      userId,
      chapterId,
      courseId,
      chapterCompletionStatus: completedChapters,
    };

    const queryCriteria = {
      userId: chapterPayload.userId,
      chapterId: chapterPayload.chapterId,
      courseId: chapterPayload.courseId,
    };

    const updateDocument = {
      $set: {
        chapterCompletionStatus: chapterPayload.chapterCompletionStatus,
      },
    };

    const chapterCompletion = await chapterCompletionModel.updateOne(
      queryCriteria,
      updateDocument,
      { upsert: true }
    );
    //     console.log(chalk.bgCyanBright("It is the chapterCompletion of the user"));
    //     console.log(chapterCompletion);
    //     console.log(
    //       chalk.bgRed(
    //         "ENDED HEREEEEEEEEEEEEEEEEEEE........................!!!!!!!!!!!!"
    //       )
    //     );
    //     await chapterCompletion.save();

    //------------------------------------Ends Here-----------------------------
    //
    //
    //
    //
    //

    //Finding out how many chapters are associated
    // Yet to be completed
    const linkedChapters = await chapterModel.find({ courseId });
    const totalAssociatedChaptersToCourse = linkedChapters?.length;
    const individualChapterWeightage =
      100 / totalAssociatedChaptersToCourse

    const completedChaptersInCourse = await chapterCompletionModel.find({
      courseId,
      userId,
    });
    let finalCourseCompletion = 0;
    for (let k = 0; k < completedChaptersInCourse.length; k++) {
      let total = completedChaptersInCourse[k]?.chapterCompletionStatus;
      total = (total * individualChapterWeightage) / 100
      finalCourseCompletion += total;
    }
    const coursePayload = {
      userId,
      chapterId,
      courseId,
      courseCompletionStatus: finalCourseCompletion,
    };

    const queryCriteriaForCourse = {
      userId: coursePayload.userId,
      courseId: coursePayload.courseId,
    };

    const updateDocumentForCourse = {
      $set: {
        courseCompletionStatus: coursePayload?.courseCompletionStatus,
        courseName: courseDoc?.courseName
      },
    };

    const courseCompletion = await courseCompletionModel.updateOne(
      queryCriteriaForCourse,
      updateDocumentForCourse,
      { upsert: true }
    );

    //     const completedCourses = Math.ceil(
    //       (completedChaptersInCourse?.length / totalAssociatedChaptersToCourse) *
    //         100
    //     );
    //-------------------Ends Here--------------------------------

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error?.messsage ?? error,
    });
  }
};
export const getAllStatus = async (req, res) => {
  try {
    const { userId } = req;
    const videoData = await videoCompletionModel.find({ userId });
    const chapterData = await chapterCompletionModel.find({ userId });
    const courseData = await courseCompletionModel.find({ userId })

    // console.log("This is course data inside getAllStatus ", courseData)
    return res.status(200).json({
      success: true,
      message: "Found data successfully",
      videoData,
      chapterData,
      courseData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.messsage ?? error,
    });
  }
};
