const express = require("express");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());

// extract style and scripts frrom subpages ino the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static("./assets"));

app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log(`Something went wrong :${err}`);
  }
  console.log(`Server is running on port:${port}`);
});
