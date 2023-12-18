// import { videoUploadLink } from "../../configs/cloudinaryForVideo.js";
import { v2 as Cloudinary } from "cloudinary";
import { getVideoDurationInSeconds } from "get-video-duration";
import {
  videoDestroyer,
  videoLinkProvider,
} from "../../configs/cloudinaryForVideo.js";
import { imageLinkProvider } from "../../configs/cloudinaryForImage.js";
import { videoModel } from "../../models/Video/videoModel.js";
import chalk, { Chalk } from "chalk";
const customChalk = new Chalk({ level: 0 });
import fs from "fs";
import { Storage } from "@google-cloud/storage";

import mime from "mime-types";

import { urlProvider } from "../../configs/GoogleCloudConsoleProvider/cloudGeneratedUrl.js";
import { chunkLinkProvider } from "../../configs/GoogleCloudConsoleProvider/ChunksVideoUrl/chunksVideoUrlGenerator.js";

// -----------------------------------------------------------
// Replace 'path/to/your/keyfile.json' with the path to your JSON key file

// Replace 'your-bucket-name' with the name of your Google Cloud Storage bucket

//Old  controller with cloudinary=============================

//  export const addVideo = async (req, res) => {
//   try {
//     // Parsing video data from the request body
//     const videoData = JSON.parse(req?.body?.videoObj);

//     // Variable to store Cloudinary information for the video
//     let videoCloudinary;

//     // Check if files are present in the request
//     if (req?.files) {
//       try {
//         // const thumbnail = await imageLinkProvider(req?.files[0]?.path);
//         const thumbnail = await urlProvider(req?.files[0]?.path)
//         videoData.thumbnail = thumbnail?.publicUrl;

//         // Retrieve and set video link from Cloudinary
//         // const videoLink = await videoLinkProvider(req?.files[1]?.path);
//         videoData.videoCloudinaryDetails = []
//         // videoData.videoLink = videoLink?.secure_url;
//         const filePath = `${req?.files[1].path}`;
//         const mimeType = mime.lookup(filePath);
//         if (mimeType == "video/x-msvideo") {
//           console.log("Unsupported file format. Please upload only .mp4 files.");
//           return res.status(error?.http_code || 400).json({
//             success: false,
//             message: `Unsupported file format.Please upload only .mp4 files.`,
//           });
//           // return;
//         }

//         const mediaDetails = await urlProvider(filePath)
//         const duration = await getVideoDurationInSeconds(filePath).then((duration) => duration)
//         // console.log("This is duratiion", duration)
//         videoData.videoGoogleCloudDetails = [{
//           duration
//         }]
//         videoData.videoLink = mediaDetails?.publicUrl;
//         // console.log("File format is supported.");

//         // console.log("THis is file name", filePath)
//         // const [file] = await storage.bucket(bucketName).upload(filePath);

//         // // Make the file publicly accessible
//         // await file.makePublic();
//         // // Get the public URL
//         // const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;
//         // videoData.videoLink = publicUrl;
//         // console.log("Public URL for the file:", publicUrl);
//         // console.log("File uploaded successfully.");

//         // Delete local copies of uploaded files
//         try {
//           fs.unlinkSync(req?.files[0]?.path);
//           console.log(
//             chalk.bold.underline.blueBright(
//               "Thumbnail deleted successfully from local uploads"
//             )
//           );
//         } catch (err) {
//           console.error(
//             chalk.bold.underline.red("Error while unlinking", err)
//           );
//         }

//         try {
//           fs.unlinkSync(req?.files[1]?.path);
//           console.log(
//             chalk.bold.underline.blueBright(
//               "Video deleted successfully from local uploads"
//             )
//           );
//         } catch (err) {
//           console.error(
//             chalk.bold.underline.red("Error while unlinking", err)
//           );
//         }
//       } catch (error) {
//         // Handle the error related to Cloudinary
//         console.log("Error occurred:", error);
//         return res.status(error?.http_code || 400).json({
//           success: false,
//           message: error?.message || error,
//         });
//       }
//     }

//     // Save the video data to the database
//     const payload = new videoModel(videoData);
//     await payload.save();

//     // Return a success response
//     return res.status(201).json({
//       success: true,
//       data: payload,
//       message: customChalk.red("Video Uploaded Successfully"),
//     });
//   } catch (error) {
//     // Handle any errors that occur during the video upload process
//     console.log("Inside catch");
//     return res.status(400).json({
//       success: false,
//       message: error?.message || error,
//     });
//   }
// };

//Ends here =================================================
const bucketName = "gravita-oasis-lms";
// This route is used to add videos
//It works as follows:
// One middleware is there to parse the data and to check the mimeType and then if every check is passed then it will come here.
//Multer is used here and diskStorage too, which is saving the data locally and then the address of the same will be given to google cloud and it will ultimately make the

//New controller with google cloud

export const addVideo = async (req, res) => {
  try {
    // Parsing video data from the request body
    const videoData = JSON.parse(req?.body?.videoObj);
    const chunkNumber = JSON.parse(req?.body?.chunkNumber);
    const totalChunks = JSON.parse(req?.body?.totalChunks);
    const originalname = JSON.parse(req?.body?.originalName);
    const originalThumbnailName = JSON.parse(req?.body?.originalThumbnailName);
    const thumbnailFlag = JSON.parse(req?.body?.thumbnailFlag);
    // console.log("this is the flag", thumbnailFlag)
    // Variable to store Cloudinary information for the video
    // let videoCloudinary;

    // Check if files are present in the request
    if (req?.files) {
      try {
        // fs.WriteStream()
        // const thumbnail = await imageLinkProvider(req?.files[0]?.path);
        // console.log("Touched")
        if (thumbnailFlag) {
          console.log("This is Flag", thumbnailFlag);

          const thumbnail = await urlProvider(
            req?.files[0]?.buffer,
            originalThumbnailName
          );
          videoData["thumbnail"] = thumbnail?.publicUrl;
          // if (!thumbnail) {
          //   console.log("no thumbnail");
          //   return res.status(400).json({
          //     success: false,
          //     message: `Internal Server error!`,
          //   });
          // } else {
          //   videoData["thumbnail"] = thumbnail?.publicUrl;
          // }
        }
        // videoData.videoCloudinaryDetails = [];
        // videoData.videoLink = videoLink?.secure_url;
        const filePath = `${req?.files[1].path}`;
        const mimeType = mime.lookup(filePath);
        if (mimeType == "video/x-msvideo") {
          console.log(
            "Unsupported file format. Please upload only .mp4 files."
          );
          return res.status(error?.http_code || 400).json({
            success: false,
            message: `Unsupported file format.Please upload only .mp4 files.`,
          });
          // return;
        }
        // console.log("This is before")
        const mediaDetails = await chunkLinkProvider(
          req,
          res,
          chunkNumber,
          totalChunks,
          originalname
        );
        // console.log("This is after")

        if (mediaDetails?.outcome === 1) {
          return res.status(200).json({
            success: true,
            message: `chunk uploaded succesfully`,
          });
        }

        // console.log("this is the req file", req?.files[1])


        // console.log("This is duratiion");
        videoData.videoGoogleCloudDetails = [
          {
            duration: videoData?.videoDuration,
          },
        ];
        videoData.videoLink = mediaDetails?.publicUrlForVideo;
        console.log("File format is supported.");
      } catch (error) {
        // Handle the error related to Cloudinary
        console.log("Error occurred:", error);
        return res.status(error?.http_code || 400).json({
          success: false,
          message: error?.message || error,
        });
      }
    }

    // Save the video data to the database
    const payload = new videoModel(videoData);
    await payload.save();

    // Return a success response
    return res.status(201).json({
      success: true,
      data: payload,
      message: customChalk.red("Video Uploaded Successfully"),
    });
  } catch (error) {
    // Handle any errors that occur during the video upload process
    console.log("Inside catch");
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};

// Controller to delete a video by ID
export const deleteVideo = async (req, res) => {
  try {
    // Extracting the video ID from the request parameters
    const { id } = req?.params;

    // Find and remove the video by ID from the database
    const data = await videoModel.findByIdAndRemove({ _id: id });

    // Delete the video from Cloudinary using its public_id
    await videoDestroyer(data?.videoCloudinaryDetails[0]?.public_id);

    // Return a success response
    return res.status(202).json({
      success: true,
      data,
      message: customChalk.red("Video Deleted Successfully"),
    });
  } catch (error) {
    // Handle any errors that occur during the video deletion process
    console.log("Inside catch");
    return res.status(400).json({
      success: false,
      message: error?.message || error,
    });
  }
};
