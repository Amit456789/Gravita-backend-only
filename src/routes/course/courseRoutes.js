// ----------------------------------------------Imports-----------------------------------------------------
import express from "express";
import {
  addCourse,
  deleteCourse,
  fetchAllCourse,
  fetchIndividualCourses,
  fetchUserCourses,
  searchCourses,
  sweepUnlinkedCourses,
  updateCourse,
} from "../../controllers/CourseController/courseController.js";
import { upload } from "./multerConfig.js";
import { userStatus } from "../../middlewares/userCurrentStatus/userStatusCheck.js";
import { checkLoginSessionStatus } from "../../middlewares/LoginSession/loginSessionCheck.js";
import { mediaUpload } from "../../middlewares/mediaUpload.js";
// ----------------------------------------------------------------------------------------------------------

// Creating an instance of the express Router
const router = express.Router();




// Pasted to every API request
//This is just to verify that if a user is forcefully got  logged out.
router.use(checkLoginSessionStatus);








// This API fetches courses as per the user data or user-specific.
//This middleware is to check the current status(If he is disabled it will be a 400 error saying that he is contact admin) of the user as well as it  appends the user id and assignedCategories with the request body
router.use(userStatus);




// This is the API to get all the courses irrespective of the teacher
// Summary: Admin will use this API (Middleware is needed) or the user too
router.route("/fetchCourses").get(fetchAllCourse);

// Upload the course with ID
router.route("/addCourse").post(mediaUpload("courseThumbnail"), addCourse);




// Fetch individual courses
router.route("/fetchIndividualCourses").get(fetchIndividualCourses);




// Update course by ID
router.route("/updateCourse/:id").patch(mediaUpload("courseThumbnail"), updateCourse);




// Delete course by ID
router.route("/deleteCourse/:id").delete(deleteCourse);




// Search courses
router.route("/searchCourses").get(searchCourses);



// Fetch user-specific courses
router.route("/fetchUserCourses").get(fetchUserCourses);





// ***********************************************************************
// Sweeping out all unlinked courses based on the courseChapters key of the collection
router.route("/sweepUnlinkedCourses").delete(sweepUnlinkedCourses);
// ***********************************************************************

// Exporting the router for use in other files
export default router;
