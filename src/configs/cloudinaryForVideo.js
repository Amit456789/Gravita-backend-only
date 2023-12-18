// const Cloudinary = require("cloudinary").v2;
import { v2 as Cloudinary } from "cloudinary";
Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const videoLinkProvider = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      Cloudinary.uploader.upload(
        file,
        {
          resource_type: "video",
          folder: "Nitish_LMS",
        },
        (error, result) => {
          if (error) {
            console.log("This is error2>>>>>>", error);
            reject(error);
          } else {
            console.log("This is url>>>>", result.secure_url);
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
export const videoDestroyer = async (filePublicId) => {
  // Change 'sample' to any public ID of your choice
  console.log("This is public id", filePublicId);

  Cloudinary.uploader
    .destroy(filePublicId, { resource_type: "video", invalidate: true })
    .then((res => console.log("This is result", res)))
    .catch((err) => console.log("this is error", err));
};
