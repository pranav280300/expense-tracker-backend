var express = require("express");
const router = express.Router();
const {createCategories,getCategories ,getCategory,updateCategory,deleteCategory} = require("../controllers/category");
const { protect, authorize } = require("../middleware/auth");
const expenseRouter = require('./expense');
router.use("/:category_Id/expenses", expenseRouter);
router.get("/:category_Id", protect, getCategory);
router.get("", protect, getCategories);
router.post("", protect, createCategories);
router.put("/:category_Id", protect, updateCategory);
router.delete("/:category_Id", protect, deleteCategory);

module.exports = router;
