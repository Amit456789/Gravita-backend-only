// User's Model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const videoCompletion = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
      default: null,
    },
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "chapter",
      default: null,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "video",
      default: null,
    },
    videoCompletionStatus: Number,

    // userMetaData: [
    //   {
    //     courseId: Schema.Types.ObjectId,
    //     courseCompletion: Number, // Number indicating course completion percentage
    //     ref: "course",
    //     chapters: [
    //       {
    //         chapterId: Schema.Types.ObjectId,
    //         chapterCompletion: Number, // Number indicating chapter completion percentage
    //         ref: "chapter",
    //         chapterVideos: [
    //           {
    //             videoId: Schema.Types.ObjectId,
    //             videoCompletion: Number, // String indicating video completion percentage
    //             ref: "videos",
    //           },
    //           // Additional video objects for the chapter
    //         ],
    //       },
    //       // Additional chapter objects for the course
    //     ],
    //   },
    //   // Additional course objects
    // ],
  },
  { timestamps: true }
);

const videoCompletionModel = mongoose.model(
  "videoCompletion",
  videoCompletion,
  "videoCompletion"
);

export default videoCompletionModel;
