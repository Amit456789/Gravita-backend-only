// const Cloudinary = require("cloudinary").v2;
import { v2 as Cloudinary } from "cloudinary";
Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const imageLinkProvider = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      Cloudinary.uploader.upload(
        file,
        {
          resource_type: "image",
          folder: "Nitish_LMS",
        },
        (error, result) => {
          if (error) {
            console.log("This is error2>>>>>>", error);
            reject(error);
          } else {
            // console.log("This is url>>>>", result.secure_url);
            // console.log("This is Result>>>>", result);
            resolve(result);
          }
        }
      );
    });
    return result; // Return the result here
  } catch (error) {
    console.log("This is error", error);
    throw error; // Rethrow the error to propagate it up the call stack
  }
};
// export const videoUploadLink = (path) => {
//   return new Promise((resolve, reject) => {
//     Cloudinary.uploader.upload(path, (error, result) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };
