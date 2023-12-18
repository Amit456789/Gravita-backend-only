import chalk from "chalk";
import chapterModel from "../../models/Chapter/chapterModel.js";
import courseModel from "../../models/Course/courseModel.js";
import { videoModel } from "../../models/Video/videoModel.js";

export const addChapter = async (req, res) => {
  try {
    const payload = req?.body;
    // Validation fields here

    // Validation ends

    // console.log("This is data", payload);
    // const datum = await chapterModel.insertMany(payload);
    const data = new chapterModel(payload);
    const datum = await data.save();
    // console.log("This is datum after db", datum);
    // console.log("This is id", datum?._id.toString());
    // const idString = objectId.toString();

    // console.log(idString);
    // Loop to take care of id insertion inside video model/collection
    for (var i = 0; i < payload?.chapterVideos.length || 0; i++) {
      let videoDetails = await videoModel.findOne({
        _id: payload.chapterVideos[i],
      });
      // const newPayload = { ...videoDetails, chapterId: datum?._id.toString() };
      const { courseId, chapterId, videoLink, videoDescription, thumbnail } =
        videoDetails;
      const newPayload = {
        courseId,
        chapterId,
        videoLink,
        videoDescription,
        thumbnail,
        chapterId: datum?._id.toString(),
      };
      // console.log("THis is video model id", newPayload);
      let updateVideoModel = await videoModel.findByIdAndUpdate(
        {
          _id: videoDetails?._id.toString(),
        },
        newPayload,
        { new: true }
      );
      // console.log("THjis is the updated video model", updateVideoModel);
    }
    return res.status(201).json({
      success: true,
      data: datum,
      message: "Data created successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error?.message || error,
    });
  }
};
export const getChapter = async (req, res) => {
  try {
    const data = await chapterModel.find();
    return res.status(200).json({
      success: true,
      data,
      message: "Data created successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error?.message || error,
    });
  }
};
export const updateChapter = async (req, res) => {
  try {
    // console.log(chalk.bgCyan("Entered inside of updateChapter"));
    // console.log(req?.body);
    const { id } = req?.params;
    const updatedData = await chapterModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    // console.log(chalk.bgRedBright("This is updateData"));
    // console.log(updatedData);
    return res.status(200).json({
      success: true,
      data: updatedData,
      message: "Data Updated successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error?.message || error,
    });
  }
};
export const searchChapter = async (req, res) => {
  try {
    let chapters = [];
    const toSearch = req?.query?.searchChapters;
    const doc = await courseModel
      .find()
      .populate("courseChapters")
      .then((res) => {
        const pattern = new RegExp(toSearch, "gi");
        res.filter(async (courseNames) => {
          console.log("This is course name", courseNames?.courseChapters);
          courseNames?.courseChapters?.map((el) => {
            if (pattern.test(el?.chapterName)) {
              // console.log(" comes from inside", courseNames);
              chapters.push(courseNames);
              pattern.lastIndex = 0;
              return;
              // return await courseModel
              //   .find({ _id: courseNames?._id })
              //   .populate("courseChapters");
            }
          });

          // return only users with email matching 'type: "Gmail"' query
        });
      })
      .catch((err) => console.log("This is exec error", err));
    return res.status(200).json({
      success: true,
      data: chapters,
      message: "Data found successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};
export const deleteChapter = async (req, res) => {
  try {
    const { id } = req?.params; //course existing id
    console.log("This is id", id);
    // await chapterModel.deleteMany({ courseId: id });
    await videoModel.deleteMany({ chapterId: id });
    // Delete a video by its _id
    const courseDelete = await chapterModel.findByIdAndRemove(id);
    console.log("This is deleted deatils", courseDelete);
    return res.status(200).json({
      success: true,
      message: `All the linked Courses and videos has been deleted`,
      data: courseDelete,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};
