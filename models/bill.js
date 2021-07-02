const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
  },
  bill: [
    {
      billType: {
        type: String,
        required: [true, "Please enter the name"],
      },
      amount: {
        type: Number,
        required: [true, "Please enter the amount"],
      },
      Status: {
        type: String,
        required: [true, "Please update the statis"],
      },
      date: {
        type: Date,
        required: [true, "Please enter the deadline"],
      },
    },
  ],
});

userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});

const User = mongoose.model("bill", userSchema);
module.exports = User;
