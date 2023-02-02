const express = require("express");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const sassMiddleware = require("node-sass-middleware");
const flash=require("connect-flash")
const customMware=require("./config/middleware")

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongodb-session")(session);

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(expressLayouts);
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));

// extract style and scripts frrom subpages ino the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");

// mongoStore is used to stre the session cookie in the db
app.use(
  session({
    name: "Codeial",
    // Todo cage secret before deployment in production
    secret: "HeyKillMe",
    saveUninitialized: false,
    resave: false,
    //  to set the time of cookie after which it expires
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // mongstore
    store: MongoStore(
      {
        mongoUrl: `mongodb://localhost/codeial_development`,
        autoRemove: "disabled",
      },

      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
app.use(customMware.setFlash )

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Something went wrong :${err}`);
  }
  console.log(`Server is running on port:${port}`);
});
