// ----------------------------Course Validation using JOI--------------------------------

// --------------------------------------imports-------------------------------------------
import joi from "joi";
// ----------------------------------------------------------------------------------------

// -----------------------------Validation Schema------------------------------------------
const courseSchema = joi.object({
    courseName: joi.string().min(5).max(100).required().messages({
      "string.base": "Course Name must be a string",
      "string.min": "Course Name must have atleast 5 character",
      "string.max": "Course Name must have atmost 100 characters",
      "any.required": "Course Name is a required field",
    }),
    courseCategory: joi.array().items(joi.object({})).messages({
        "array.base":"Course Category must be an Array of Objects",
        "object.base":"Course Category must have Objects"
    }),
    videoDetails:joi.array().items(joi.object({})).messages({
        "array.base":"Video Details must be an Array of Objects",
        "object.base":"Video Details must have Objects"
    }),
    providerDetails:joi.array().items(joi.object({})).messages({
        "array.base":"Provider Details must be an Array of Objects",
        "object.base":"Provider Details must have Objects"
    }),
});

// -------------------------------------------------------------------------------------------------------------
export const courseValidation = (data)=>{
    const result = courseSchema.validate(data);
    return result;
}

