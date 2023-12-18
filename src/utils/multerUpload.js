// =====================================================imports==============================================
import multer from "multer";
import { storage } from "../configs/cloudinary.js";

// **********************************************************************************************************

//upload -- variable calling the multer constructor and setting the multer configuration
const upload = multer({
  storage: storage,
});

export default upload;
