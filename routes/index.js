const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

const authRoutes = require("./authRoutes");
const options = require("./options");
const invoice = require("./invoice");
const bill = require("./bill");
const payroll = require("./payroll");

router.use(authRoutes);
router.use(options);
router.use(invoice);
router.use(bill);
router.use(payroll);

module.exports = router;
