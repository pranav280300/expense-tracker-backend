const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
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

//static method to get sum of total expense
ExpenseSchema.statics.getTotalCost = async function (category_Id) {
  const obj = await this.aggregate([
    {
      $match: { category: category_Id },
    },
    {
      $group: {
        _id: "$category",
        totalExpense: { $sum: "$amount" },
      },
    },
  ]);
  try {
    await this.model("Category").findByIdAndUpdate(category_Id, {
      totalExpense: obj[0].totalExpense,
    });
  } catch (err) {
    console.log(err);
  }
};

//CAll getAverage Cost after the save
ExpenseSchema.post("save", function () {
  this.constructor.getTotalCost(this.category);
});
//CAll getAverage Cost befour the remove
ExpenseSchema.pre("remove", function () {
  this.constructor.getTotalCost(this.category);
});

module.exports = mongoose.model("Expense", ExpenseSchema);
