const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"],
  },
  category: {
    type: String,
    required: [true, "Please add a Category"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
