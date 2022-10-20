const passport = require("passport");
const User = require("../model/user");

// use Pascal casing for passprt strategy
const LocalStrategy = require("passport-local").Strategy;

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding the user --> Passport");
          //   to report an error to passport
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Inavalid User Name or Password ");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// Serializing the user to decide which key is to kept in the cookies(to set the key in the cookie)
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding the user --> Passport");
      //   to report an error to passport
      return done(err); 
    }
  });
});

module.exports = passport;
