const User = require("../models/user");
const Payroll = require("../models/payroll");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
var schedule = require("node-schedule");

module.exports.payroll_get = (req, res) => {
  Payroll.find({ username: req.params.username }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const newList = result[0].payroll.map((elem) => {
        var temp = Object.assign({}, elem);
        var date1 = new Date().getTime();
        var date2 = new Date(elem.date).getTime();
        if (date1 > date2) {
          temp.Status = "Delayed";
        }
        return temp;
      });
      Payroll.findOneAndUpdate(
        { username: req.params.username },
        { payroll: newList },
        (err, re) => {
          if (err) {
            console.log(err);
          } else {
            console.log(re);
            res.render("payroll", {
              username: re.username,
              payArr: re.payroll,
            });
          }
        }
      );
    }
  });
};
module.exports.payroll_post = (req, res) => {
  Payroll.findOneAndUpdate(
    { username: req.params.username, "payroll.name": req.params.name },
    {
      $set: {
        "payroll.$.Status": req.params.status,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/payroll/" + req.params.username);
      }
    }
  );
};
module.exports.createPay_get = (req, res) => {
  res.render("createPay", {
    name: req.params.username,
  });
};
module.exports.createPay_post = (req, res) => {
  const { name, amount, Status, email, date } = req.body;
  Payroll.findOneAndUpdate(
    { username: req.params.username },
    {
      $push: {
        payroll: { name, amount, Status, email, date },
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const day = new Date(date);
        const hours = day.getHours();
        const minutes = day.getMinutes();
        // console.log(hours, minutes);
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
                user: "jj6144@srmist.edu.in", // generated ethereal user
                pass: "SRMworld$2468", // generated ethereal password
              },
            });

            let info = await transporter.sendMail({
              from: "jj6144@srmist.edu.in", // sender address
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
        res.redirect("/payroll/" + req.params.username);
      }
    }
  );
};
