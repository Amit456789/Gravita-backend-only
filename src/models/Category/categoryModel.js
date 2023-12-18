// ----------------------------------------------Imports-------------------------------------------------------
import mongoose from "mongoose";
import { Schema } from "mongoose";
// ------------------------------------------------------------------------------------------------------------

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required:[true,"Category Name is a required field"]
    }
})

const categoryModel = mongoose.model("category", categorySchema, "category");
export default categoryModel;
