const User = require("../models/user");
const Bill = require("../models/bill");
const mongoose = require("mongoose");

module.exports.bill_get = (req, res) => {
  Bill.find({ username: req.params.username }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const newList = result[0].bill.map((elem) => {
        var temp = Object.assign({}, elem);
        var date1 = new Date().getTime();
        var date2 = new Date(elem.date).getTime();
        if (date1 > date2) {
          temp.Status = "Delayed";
        }
        return temp;
      });
      Bill.findOneAndUpdate(
        { username: req.params.username },
        { bill: newList },
        (err, re) => {
          if (err) {
            console.log(err);
          } else {
            console.log(re);
            res.render("bill", {
              username: re.username,
              billArr: re.bill,
            });
          }
        }
      );
    }
  });
  // res.render("bill");
};
module.exports.bill_post = (req, res) => {
  Bill.findOneAndUpdate(
    { username: req.params.username, "bill.billType": req.params.name },
    {
      $set: {
        "bill.$.Status": req.params.status,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/bill/" + req.params.username);
      }
    }
  );
};
module.exports.createBill_get = (req, res) => {
  res.render("createBill", {
    name: req.params.username,
  });
};
module.exports.createBill_post = (req, res) => {
  const { billType, amount, Status, date } = req.body;

  Bill.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: {
        bill: { billType, amount, Status, date },
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/bill/" + req.params.username);
      }
    }
  );
};
