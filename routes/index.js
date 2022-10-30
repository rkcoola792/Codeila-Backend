const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homecontroller");
const passport = require("../config/passport_local_strategy");

console.log("router loaded");

router.get(
  "/",
//   passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  homeController.home
);

//using user.js
router.use("/users", require("./user"));
router.use("/posts", require("./posts"));

module.exports = router;
