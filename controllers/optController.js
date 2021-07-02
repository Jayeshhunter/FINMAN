const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports.option_get = (req, res) => {
  res.render("options", {
    username: req.params.id,
  });
};
