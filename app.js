const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");
const nodemailer = require("nodemailer");
var schedule = require("node-schedule");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
// const authRoutes = require("./routes/authRoutes");
// const reload = require("reload");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public/css/")));
app.use(express.static(path.join(__dirname, "public/assests/")));
app.use(express.static(path.join(__dirname, "public/js/")));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
const port = process.env.PORT || 5000;
mongoose
  .connect(
    "mongodb+srv://hackDB:Jayesh@135@cluster0.lev68.mongodb.net/hackDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/", router);
