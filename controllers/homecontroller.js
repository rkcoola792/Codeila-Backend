const { name } = require("ejs");

module.exports.home = function (req, res) {
  console.log(req.cookies);
  res.cookie("name", "Kumar");
  res.render("home", { title: "Home" });
};
