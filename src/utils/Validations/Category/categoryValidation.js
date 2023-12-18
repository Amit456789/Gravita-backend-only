// ----------------------------Category Validation using JOI--------------------------------

// --------------------------------------imports-------------------------------------------
import joi from "joi";
// ----------------------------------------------------------------------------------------

// -----------------------------Validation Schema------------------------------------------
const categorySchema = joi.object({
    categoryName: joi.string().min(2).max(100).required().messages({
      "string.base": "Category Name must be a string",
      "string.min": "Category Name must have atleast 5 character",
      "string.max": "Category Name must have atmost 100 characters",
      "any.required": "Category Name is a required field",
    })
});

// -------------------------------------------------------------------------------------------------------------
export const categoryValidation = (data)=>{
    const result = categorySchema.validate(data);
    return result;
}

