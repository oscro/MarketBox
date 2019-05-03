const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("./passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
var cloudinary = require('cloudinary');
require("dotenv").config();
const flash = require('connect-flash');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(morgan("dev"))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: "Oryus",
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash());

//coludinary config
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/marketBox";
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true });

// Define API routes here
app.use("/auth", require("./routes"));


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
