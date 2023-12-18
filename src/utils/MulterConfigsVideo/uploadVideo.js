// const upload = require("./multerPdfUpload.js").upload;

import { upload } from "./multer.js";

const uploadSingleImage = upload.array("videoLink");
function validateMimeType(req, res, next) {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    next();
  });
}
export { validateMimeType };
