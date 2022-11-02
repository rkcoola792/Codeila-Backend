const Comment = require("../model/comment");
const Post = require("../model/post");

module.exports.create = function (req, res) {
  console.log("inside comments", req.body);

  Post.findById(req.body.post, function (err, post) {
    if (post) {
      console.log("post found", post);
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          // handle error

          // if (err) {
          //   return;
          // }
            console.log("coomets", post)
          post.comment.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};
