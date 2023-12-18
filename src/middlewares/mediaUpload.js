// Import the 'upload' middleware from your multer configuration
import { upload } from "../utils/MulterConfigsVideo/multer.js";

// Define a function that takes the field name as a parameter
const mediaUpload = (fieldName) => {
  // Use the 'upload' middleware to create a function that processes a single file with the specified field name
  const uploadSingleImage = upload.single(fieldName);

  // Return a function that can be used as middleware
  return (req, res, next) => {
    uploadSingleImage(req, res, function (err) {
      if (err) {
        return res.status(400).send({ message: err.message });
      }
      next();
    });
  };
};

// Export the 'mediaUpload' function
export { mediaUpload };
