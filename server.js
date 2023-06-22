const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const methodOverride = require("method-override");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("app-module-path").addPath(__dirname);
require("dotenv").config();

mongoose
  .connect(
    "mongodb://root:ljll7w6hSnNwSBFbARAIPPKz@billy.iran.liara.ir:32747/my-app?authSource=admin"
  )
  .then((res) => console.log("connected to database"))
  .catch((err) => console.log("could not connect to mongo: " + err));
global.config = require("./config");

app.use(cors());
app.use(express.json());
//middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride("method"));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now() + 1000 * 3600 * 24 * 100) },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use(flash());

require("./passport/passport-local");
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals = { errors: req.flash("errors"), req: req };
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/", require("./routes/index"));

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});

//for nodemon crashing solution
//Set-ExecutionPolicy -Scope CurrentUser Unrestricted
