var express = require("express");
const router = express.Router();
const { addExpense,getExpenses,updateExpense,getExpense,deleteExpense} = require("../controllers/expense");
const { protect, authorize } = require("../middleware/auth");
router.get("", protect, getExpenses);
router.get("/:expense_Id", protect, getExpense);
router.post("", protect, addExpense);
router.put("/:expense_Id", protect, updateExpense);
router.delete("/:expense_Id",protect,deleteExpense);

module.exports = router;
