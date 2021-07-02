const User = require("../models/user");
const Invoice = require("../models/invoice");
const payRoll = require("../models/payroll");
const bill = require("../models/bill");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const handleError = (err) => {
  //   console.log(err.message, err.code);
  let errors = { message: "" };

  //duplicate error code
  errors.message = "User Already exists";

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, "secretkey", {
    expiresIn: maxAge,
  });
};
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      const member = await User.create({ username, email, password: hash });
      if (member) {
        Invoice.create({ username, invoice: [] }, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        payRoll.create({ username, payroll: [] }, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
        bill.create({ username, bill: [] }, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
      }
      const token = createToken(member._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect("/options/" + username);
    } catch (err) {
      console.log(err);
      res.redirect("/login");
    }
  });
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await User.login(username, password);
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect("/options/" + username);
      } else {
        res.redirect("/login");
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect("/signup");
  }
};
