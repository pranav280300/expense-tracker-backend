const ErrorResponse = require("../utils/errorResponse");
const Expense = require("../models/Expense");
const asyncHandler = require("../middleware/async");
//@dec  Create a Expense
//@route POST /api/v1/expenses
//@access Private
 
exports.addExpense = asyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;
  const expense = await Expense.create(req.body);
  res.status(200).json({
    success: true,
    data: expense,
  });
});

//@dec  get all Expenses
//@route GET /api/v1/expenses
//@access Private
 
exports.getExpenses = asyncHandler(async (req, res, next) => {
  const expenses = await Expense.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    data: expenses,
  });
});
//@dec  Get an Expense by ID
//@route GET /api/v1/expenses/:expense_Id
//@access Private
 
exports.getExpense= asyncHandler(async (req, res, next) => {
       let expense = await Expense.findById(req.params.expense_Id);
       if (!expense) {
         return next(new ErrorResponse(`No Expense with id of ${req.params.expense_Id} exists`, 404));
       }
       res.status(200).json({
         success: true,
         data: expense,
       });
});

//@dec Update an Expense
//@route PUT /api/v1/expenses/:expense_Id
//@access Private
 
exports.updateExpense = asyncHandler(async (req, res, next) => {
       let expense = await Expense.findById(req.params.expense_Id);
       if (!expense) {
         return next(new ErrorResponse(`No Expense with id of ${req.params.id} exists`, 404));
       }
       expense = await Expense.findByIdAndUpdate(req.params.expense_Id, req.body, {
         new: true,
         runValidator: true,
       });
       res.status(200).json({
         success: true,
         data: expense,
       });
});

//@dec delete an Expense
//@route DELETE /api/v1/expenses/:expense_Id
//@access Private
 
exports.deleteExpense = asyncHandler(async (req, res, next) => {
       let expense = await Expense.findById(req.params.expense_Id);
       if (!expense) {
         return next(new ErrorResponse(`No Expense with id of ${req.params.id} exists`, 404));
       }
       expense = await Expense.findByIdAndRemove(req.params.expense_Id);
       res.status(200).json({
         success: true,
         data: expense,
       });
});

