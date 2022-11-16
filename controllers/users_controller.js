const User = require("../model/user");

module.exports.profile = function (req, res) {
  // finding a particular user and showing his profile
  User.findById(req.params.id, function (err, user) {
    console.log("User in profile ", user);
    return res.render("profile", { title: "Profile", profile_user: user });
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      req.flash("success", "Updated")
      return res.redirect("back");
    });
  } else {
    req.flash('error', 'Unauthorized!');
    return res.status(401).send("Unauthorized");
  }
};

// function for sign up
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", { title: "Codeial || Sign Up" });
};

// function for sign In
module.exports.signIn = function (req, res) {
  // to check if the user is authenticated do not let him to sign in or signup again
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", { title: "Codeial || Sign In" });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  // to find an entry in the USer collection
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      // to create a new entry
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign in and create session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res, next) {
  
  // passport function to logout
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out");
    res.redirect("/");
  });
};
