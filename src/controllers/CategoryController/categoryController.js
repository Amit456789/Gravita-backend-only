// ---------------------------------------------Imports-------------------------------------------------
import categoryModel from "../../models/Category/categoryModel.js";
import courseModel from "../../models/Course/courseModel.js";
import { categoryValidation } from "../../utils/Validations/Category/categoryValidation.js";
// -----------------------------------------------------------------------------------------------------

// @desc - Create Category
// @route - post /category
// @access - private
export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req?.body;

    const validationResult = categoryValidation({
      categoryName,
    });

    const categoriesDoc = await categoryModel.find();

    if (validationResult.error) {
      return res.status(400).json({
        success: false,
        message: validationResult.error.details[0].message,
      });
    }

    if (categoriesDoc.length > 0) {
      for (let i = 0; i < categoriesDoc.length; i++) {
        if (
          categoriesDoc[i]?.categoryName
            ?.trim()
            ?.toLowerCase()
            ?.replaceAll(" ", "") ==
          categoryName?.trim()?.toLowerCase()?.replaceAll(" ", "")
        ) {
          return res.status(400).json({
            success: false,
            message: "Category Name must be unique",
          });
        }
      }
    }

    const doc = new categoryModel({ categoryName });

    await doc.save();

    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${error.message}`,
    });
  }
};

// @desc - Fetch Categories
// @route - GET /category
// @access - private
export const fetchCategories = async (req, res) => {
  try {
    let doc = await categoryModel.find();
    const doc2 = await courseModel.find();
    // console.log("This is array avove", doc);
    let arr = [];
    // let
    for (let i = 0; i < doc.length; i++) {
      let categoryName = doc[i]?.categoryName;
      let _id = doc[i]?._id;
      let categoryCourses = [];
      for (let j = 0; j < doc2.length; j++) {
        let payload = {};
        if (doc2[j]?.courseCategory?.includes(doc[i]?._id)) {
          // console.log("INside ")
          payload.courseName = doc2[j]?.courseName;
          payload.courseId = doc2[j]?._id;
          categoryCourses.push(payload);
          // break;
        }
      }
      // console.log("This is category names", categoryCourses);
      const finalPayload = {
        categoryName,
        _id,
        categoryCourses,
      };
      arr.push(finalPayload);
    }
    // let arr = [...doc];
    // console.log("This is array", arr);
    // const userCourses = await courseModel.find({
    //   courseCategory: { $in: arr },
    // });
    // console.log("This is courses", userCourses);
    return res.status(200).json({
      success: true,
      message: "Data Found Successfully",
      categoryData: arr,
      // categoryNames,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${error.message}`,
    });
  }
};

// @desc - Delete Category
// @route - DELETE /category/:id
// @access - private
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const doc = await categoryModel.findByIdAndDelete({ _id: id });
//     // Deleting all the data associated with the categoryId
//     // 1 : --> Deleting all the associated courses 
// const linkedCourses = 



    //
    if (!doc) {
      return res.status(400).json({
        success: false,
        message: "No Such Document Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${error.message}`,
    });
  }
};

// @desc - Update Category
// @route - PATCH /category/:id
// @access - private
export const updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const { categoryName } = req?.body;

    if (!id || !categoryName) {
      return res?.status(400).json({
        success: false,
        message: "Incomplete Data Provided",
      });
    }

    const categoriesDoc = await categoryModel.find();

    if (categoriesDoc.length > 0) {
      for (let i = 0; i < categoriesDoc.length; i++) {
        if (
          categoriesDoc[i]?.categoryName
            ?.trim()
            ?.toLowerCase()
            ?.replaceAll(" ", "") ==
          categoryName?.trim()?.toLowerCase()?.replaceAll(" ", "")
        ) {
          return res.status(400).json({
            success: false,
            message: "Category Name must be unique",
          });
        }
      }
    }

    const doc = await categoryModel.findOneAndUpdate(
      { _id: id },
      { $set: { categoryName } },
      { $new: true }
    );

    if (!doc) {
      return res.status(400).json({
        success: false,
        message: "No Such Document Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Document Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ! ${error.message}`,
    });
  }
};
