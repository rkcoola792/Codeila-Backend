const Post = require("../model/post");

module.exports.create = function (req, res) {
  console.log(req.user_id);
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating a post");
        return;
      }
      return res.redirect("back");
    }
  );
};
