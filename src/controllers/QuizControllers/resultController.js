import chalk from "chalk";
import { resultModel } from "../../models/Quiz/resultModel.js";
//
export const generateResult = async (req, res) => {
  try {
    const payload = req?.body?.payload;
    //Result calculation comes here
    let scoreCard = [];

    payload?.forEach((el, i) => {
      let resultEntries = {
        quiz: el?._id,
        score: 0,
        chapterId: el?.chapterId || "NA",
      };
      el?.options.forEach((element, index) => {
        let select = el?.selectedAnswer?.selectedAnswer.trim() || ""
        if (
           select === element?.option.trim()
        ) {
          if (element?.isCorrect) {
            resultEntries.score = 1;
          }
          return;
        }
      });
      scoreCard.push(resultEntries);
    });

    //loop to take cARE OF the score card subject wise
    let obj = {};
    for (let i = 0; i < scoreCard.length; i++) {
      // console.log(scoreCard[i]?.chapterId._id)
      const target = scoreCard[i]?.chapterId;
      if (obj[target]) {
        // console.log("Current score",scoreCard[i])
        obj[target] += scoreCard[i].score;
      } else {
        obj[target] = scoreCard[i].score;
      }
    }
    let newArr = [];
    for (let objectKey in obj) {
      newArr.push({ chapterId: objectKey, score: obj[objectKey] });
    }
    //
    scoreCard.chapterQuizScore = newArr;
    // scoreCard.userId = req?.userId;
    //
    //other logics to increase attempt and others.

    //
    const newScoreCard = { ...scoreCard };
    delete scoreCard.chapterQuizScore;
    const finalPayload = {
      scoreCard: scoreCard,
      userId: req?.userId,
      chapterQuizScore: newScoreCard.chapterQuizScore,
    };
    const data = await resultModel.insertMany(finalPayload);
    // await data.save();
    return res.status(200).json({
      success: true,
      data: data || [],
      message: "Added user details successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};
export const getResults = async (req, res) => {
  try {
    const data = await resultModel
      .find()
      .populate("chapterQuizScore.chapterId")
      .populate("scoreCard.quiz");
    return res.status(200).json({
      success: true,
      data,
      message: "Data found successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error?.message || message,
    });
  }
};
