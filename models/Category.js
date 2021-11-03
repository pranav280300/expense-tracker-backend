const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please add category type"],
  },
  totalExpense: {
    type: Number,
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
    //Casade delete Expenses when a Category is deleted
  categorySchema.pre("remove", async function (next) {
    console.log(`Expenses removed from ${this._id}`);
    await this.model("Expense").deleteMany({ category: this._id });
    next();
  });
module.exports = mongoose.model("Category", categorySchema);
