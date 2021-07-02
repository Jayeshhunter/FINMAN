const User = require("../models/user");
const Invoice = require("../models/invoice");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
var schedule = require("node-schedule");

module.exports.invoice_get = (req, res) => {
  Invoice.find({ username: req.params.username }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const newList = result[0].invoice.map((elem) => {
        var temp = Object.assign({}, elem);
        var date1 = new Date().getTime();
        var date2 = new Date(elem.date).getTime();
        if (date1 > date2) {
          temp.Status = "Delayed";
        }
        return temp;
      });
      // console.log("newlist", newList);
      Invoice.findOneAndUpdate(
        { username: req.params.username },
        { invoice: newList },
        (err, re) => {
          if (err) {
            console.log(err);
          } else {
            console.log("second", re);
            res.render("invoice", {
              username: re.username,
              inArr: re.invoice,
            });
          }
        }
      );
    }
  });
};
module.exports.invoice_post = (req, res) => {
  console.log("hello", req.body);
  Invoice.findOneAndUpdate(
    { username: req.params.username, "invoice.name": req.params.name },
    {
      $set: {
        "invoice.$.Status": req.params.status,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/invoice/" + req.params.username);
      }
    }
  );
};
module.exports.createInv_get = (req, res) => {
  res.render("createInv", {
    name: req.params.username,
  });
};
module.exports.createInv_post = (req, res) => {
  const { name, amount, Status, email, date } = req.body;
  Invoice.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: {
        invoice: { name, amount, Status, email, date },
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const day = new Date(date);
        const hours = day.getHours();
        const minutes = day.getMinutes();
        const fdate = day.getDate();
        const fmonth = day.getMonth();
        const fyear = day.getFullYear();
        var timer = new Date(fyear, fmonth, fdate, hours, minutes, 0);
        var j = schedule.scheduleJob(timer, function () {
          async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "", // generated ethereal user
                pass: "", // generated ethereal password
              },
            });

            let info = await transporter.sendMail({
              from: "", // sender address
              to: email, // list of receivers
              subject: "F I N M A N", // Subject line
              text: `Greetings, participant!
            
                Hello!
                
                Stay tuned!
                Warmest regards,
                F I N M A N`,
              html: `<p style="font-size:20px;background:orange;border:3px;border-radius:15px;box-shadow:10px;color:black;padding:20px"><strong><bold>F I N M A N</bold></strong><br/><br/><br/>A reminder for your payment<br/><br/>Name:${name}, Amount: ${amount},Status: ${Status},Email: ${email},Date: ${date}<br/><br/>Stay tuned!<br/>Warmest regards,<br/>F I N M A N, SRMIST<br/></p>`,
              // html: "<b>Hello world?</b>", // html body
            });
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          }
          main().catch(console.error);
          // console.log('The world is going to end today.');
        });

        res.redirect("/invoice/" + req.params.username);
      }
    }
  );
};
