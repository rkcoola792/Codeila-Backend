const { name } = require("ejs");
const { populate } = require("../model/post");
const Post = require("../model/post");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie("name", "Kumar");
  // Post.find({}, function (err, posts) {
  //   res.render("home", { title: "Codeial||Home", posts: posts });
  // });

  // populate the user of each posts
  await Post.find({})
    .populate({ path: "user" })
    .exec(function (err, posts) {
      console.log("line 16", posts);
      return res.render("home", { title: "Codeial||Home", posts: posts });
    });
};
