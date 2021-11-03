const ErrorResponse = require("../utils/errorResponse");
const Expense = require("../models/Expense");
const Category = require("../models/Category");
const asyncHandler = require("../middleware/async");

//@dec  Create a Category
//@route POST /api/v1/Category
//@access Private

exports.createCategories = asyncHandler(async (req, res, next) => {
  let data = { "type": req.body.type, "user": req.user._id };
  const category = await Category.create(data);
  if (!category) return next(new ErrorResponse("Internal Server Error", 500));
  res.status(200).json({
    success: true,
    data: category,
  });
});

//@dec  find all Categories of the user that he/she has created.
//@route GET /api/v1/Category
//@access Private

exports.getCategories = asyncHandler(async (req, res, next) => {
  let categories = await Category.find({ user: req.user._id });
  if (!categories)
  return next(new ErrorResponse(`No category present`, 404));
  res.status(200).json({
    success: true,
    data: categories,
  });
});

//@dec  Get a Category by Id
//@route PUT /api/v1/Category/:category_Id
//@access Private

exports.getCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.category_Id);
  if (!category)
  return next(new ErrorResponse(`No category present`, 404));
  res.status(200).json({
    success: true,
    data: category,
  });
});

//@dec  Update a Category
//@route PUT /api/v1/Category/:category_Id
//@access Private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findByIdAndUpdate(req.params.category_Id,req.body);
  if (!category)
  return next(new ErrorResponse(`No category present`, 404));
  res.status(200).json({
    success: true,
    data: category,
  });
});

//@dec  Delete a Category
//@route DELETE /api/v1/Category/:category_Id
//@access Private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.category_Id);
  if (!category) { 
  res.status(400).json({
    success: false,
  });
}
        category.remove();
        res.status(200).json({
          success: true,
          data: {},
        });
});