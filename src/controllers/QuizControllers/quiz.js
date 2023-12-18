import chalk from "chalk";
import chapterModel from "../../models/Chapter/chapterModel.js";
import { quizModel } from "../../models/Quiz/quiz.js";
import courseModel from "../../models/Course/courseModel.js";

export const addQuiz = async (req, res) => {
  try {
    // console.log("THis is the body", req?.body);
    let payload = req?.body || {};
    // console.log(chalk.bgCyanBright("this is quiz"));
    // console.log(payload);
    // payload.answers = payload.options;
    const data = await quizModel.insertMany(payload);
    // await data.save();
    // console.log(chalk.bgGreenBright("this is data"));
    // console.log("data", data);
    //Logic to update the chapter model
    // const payloadToChapter = await chapterModel.findByIdAndUpdate(id,)

    let payloadToChapter;
    for (let k = 0; k < payload.length; k++) {
      // const quizzIds = {}
      payloadToChapter = await chapterModel.findByIdAndUpdate(
        { _id: payload[k]?.chapterId },
        { $push: { chapterQuizzes: data[k]?._id } },
        { $new: true }
      );
    }

    // console.log(chalk.bgRedBright("This is updated data"));
    // console.log(payloadToChapter);
    // return res.status(400).json({
    //   success: false,
    //   message: "rrro",
    // });
    return res.status(201).json({
      success: true,
      data,
      message: `${
        payload.length === 1 ? "Quiz" : "Quizzes"
      } added successfully`,
      payloadToChapter,
    });
  } catch (error) {
    console.log(`Inside catch block of add quiz ${error?.message || error}`);
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};



export const getQuiz = async () => {
  try {
    let id = req?.params;
    const data = await quizModel.find({ _id: id });
    return res.status(201).json({
      success: true,
      data,
      message: "Quiz found successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};





export const getAllQuizzes = async () => {
  try {
    const data = await quizModel.find();
    return res.status(201).json({
      success: true,
      data,
      message: "Quizzes found successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};


export const updateQuiz = async (req, res) => {
  try {
    const { id } = req?.params;
    const { payload } = req?.body;
    const updatedData = await quizModel.findByIdAndUpdate(id, {
      $set: payload,
    });
    return res.status(201).json({
      success: true,
      data: updatedData,
      message: "Quiz updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};


export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req?.params;
    const deletedData = await quizModel.findByIdAndDelete(id);
    return res.status(201).json({
      success: true,
      data: deletedData,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};


export const searchQuiz = async (req, res) => {
  try {
    let chapters = [];
    // console.log(chalk.bgCyanBright("Entered inside the searchQuizzes)
    const toSearch = req?.query?.searchQuizzes;
    console.log(
      chalk.bgCyanBright("Entered inside the searchQuizzes", toSearch)
    );
    // const pattern = new RegExp(toSearch, "gi");
    const doc = await courseModel
      .find()
      .populate({
        path: "courseChapters",
        model: chapterModel,
        populate: [
          {
            path: "chapterQuizzes",
            model: "quiz",
          },
        ],
      })
      .then((res) => {
        const pattern = new RegExp(toSearch, "gi");
        res.map(async (courseNames) => {
          // console.log(
          //   "This is course name",
          //   courseNames?.courseChapters[0]?.chapterQuizzes
          // );
          courseNames?.courseChapters[0]?.chapterQuizzes?.map(
            (individualQuizzes, indexOfQuiz) => {
              if (pattern.test(individualQuizzes?.question)) {
                // console.log(
                //   chalk.bgBlueBright(" comes from inside"),
                //   courseNames
                // );
                const chapterId = [courseNames?.courseChapters[0]];
                // console.log(chalk.bgRedBright("This is chapter Id"), chapterId);
                delete courseNames?._doc?.courseChapters;
                let finalPayload = courseNames;
                finalPayload._doc.courseChapters = chapterId;
                // console.log(chalk.bgCyanBright.bold("This is courses"));
                // console.log(courseNames);

                // console.log("This is final Payload", finalPayload);
                // const dataToBeAdded = courseNames?.courseChapters?.filter(())
                // const courseChecker = chapters.some((obj, index) => {
                //   if (obj.courseName === courseNames?.courseName) {
                //     const newPayload = { ...individualQuizzes?._doc };
                //     console.log(newPayload)
                //   }
                // });
                // if (courseChecker) {
                //   console.log(chalk.bgCyanBright("Yes i am in"));
                //   console.log([
                //     ...chapters
                //   ])
                // } else {
                //   //here comes the playload
                //   console.log("Here comes the payload")
                // }
                // console.log(finalPayload);

                // //Final logic

                if (chapters.length == 0) {
                  chapters.push(finalPayload);
                } else {
                  //here comes an for loop
                  let flag = false;
                  for (var i = 0; i < chapters.length; i++) {
                    if (
                      chapters[i].courseName === finalPayload._doc.courseName
                    ) {
                      flag = true;

                      const newPayload = [
                        ...chapters[i].courseChapters,
                        ...finalPayload._doc.courseChapters,
                      ];
                      // console.log(
                      //   chalk.bgCyanBright("This is course Chapter"),
                      //   chapters[i]?._doc,
                      //   chalk.bgGreenBright("Ended here")
                      // );
                      chapters[i] = {
                        ...(chapters[i]?._doc
                          ? { ...chapters[i]?._doc }
                          : { ...chapters[i] }), // Spread _doc if it exists
                        // ...chapters[i], // Spread the remaining properties of chapters[i]
                        courseChapters: newPayload,
                      };

                      // chapter = [...str,chapter[i]]
                    }
                  }
                  if (!flag) {
                    chapters.push(finalPayload);
                  }
                }

                //
                // chapters.push(finalPayload);
                pattern.lastIndex = 0;
                return;
                // return await courseModel
                //   .find({ _id: courseNames?._id })
                //   .populate("courseChapters");
              }
            }
          );

          // return only users with email matching 'type: "Gmail"' query
        });
        // chapters.push(res);
      })
      .catch((err) => console.log("This is exec error", err));

    return res.status(200).json({
      success: true,
      data: chapters,
      // data2: chapters || [],
      message: "Data found successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};
