import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import dotenv from "dotenv";
dotenv.config();
// ------------------------------------------------------------------------------------------------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Nitish_LMS", // Here, This is the cloudinary folder name which will be use for cloudinary storage.
    public_id: (req, file) => {
      // File Name for Cloudinary which will come with url also.
      return `${
        file?.originalname ? file?.originalname : "Nitish_LMS"
      }-${new Date().getTime()}`;
    },
  },
});

// ------------------------------------------ THE END ------------------------------------------------------
