// ---------------------------------------------Imports-------------------------------------------------
import express from "express";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "../../controllers/CategoryController/categoryController.js";
// -----------------------------------------------------------------------------------------------------

const router = express.Router();

router.route("/")
        .post(createCategory);

router.route("/")
        .get(fetchCategories);

router.route("/:id")
        .patch(updateCategory);

router.route("/:id")
        .delete(deleteCategory);

export default router;