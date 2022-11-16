const Post = require("../model/post");
const Comment = require("../model/comment");

module.exports.create = async function (req, res) {
  console.log(req.user_id);
  console.log("hi");
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      console.log(res.createdAt)
      return res.status(200).json({
        data: {
          post: post,
          user: req.user,
        },
        message: "post created",
      });
    
    }

    req.flash("success", "Post created");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    console.log("Error", err);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
      req.flash("success", "Post deleted");
      return res.redirect("back");
    } else {
      req.flash("error", "You cannnot delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("Error", err);
    return res.redirect("back");
  }
};
