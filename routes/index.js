const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homecontroller");

console.log("router loaded");

router.get("/", homeController.home);

//using user.js
router.use("/users", require("./user"));

module.exports = router;
