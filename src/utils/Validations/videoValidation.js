// ----------------------------Video Validation using JOI--------------------------------

// --------------------------------------imports-------------------------------------------
import joi from "joi";
import { linkRegex } from "../regexes";
//----------------------------------------------------------------------------------------

// -----------------------------Validation Schema------------------------------------------
const videoSchema = joi.object({
  videoLink: joi
    .string()
    .min(5)
    .max(100)
    .required()
    .pattern(linkRegex)
    .messages({
      "string.base": "Video Link must be a string",
      "string.min": "Video Link must have atleast 5 character",
      "string.max": "Video Link must have atmost 100 characters",
      "any.required": "Video Link is a required field",
    }),
  videoTitle: joi.string().min(5).max(100).required().messages({
    "string.base": "Video Title must be a string",
    "string.min": "Video Title must have atleast 5 character",
    "string.max": "Video Title must have atmost 100 characters",
    "any.required": "Video Title is a required field",
  }),
  videoDescription: joi.string().min(5).max(1000).required().messages({
    "string.base": "Video Description must be a string",
    "string.min": "Video Description must have atleast 5 character",
    "string.max": "Video Description must have atmost 100 characters",
    "any.required": "Video Description is a required field",
  }),
  videoCategory: joi.array().items(joi.object({})).messages({
    "array.base": "Video Category must be an Array of Objects",
    "object.base": "Video Category must have Objects",
  }),
  thumbnail: joi.string(),
  rating:joi.number(),
  review:joi.array().items(joi.object({})).messages({
    "array.base": "Review must be an Array of Objects",
    "object.base": "Review must have Objects",
  })
});

// -------------------------------------------------------------------------------------------------------------
export const videoValidation = (data) => {
  const result = videoSchema.validate(data);
  return result;
};
