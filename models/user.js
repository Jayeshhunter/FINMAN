const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
  },
});

userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});

// static method to login user
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username: username });
  console.log(user);
  if (user) {
    return user;
  }
  throw Error("incorrect id");
};

const User = mongoose.model("buser", userSchema);
module.exports = User;
