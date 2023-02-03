const Post = require("../../../model/post");
const Comment = require("../../../model/comment");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comment",
      populate: {
        path: "user",
      },
    });

  return res.status(200).json({
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    // if (post.user == req.user.id){
    post.remove();

    await Comment.deleteMany({ post: req.params.id });

    return res.status(200).json({
      message: "Post and associated comments deleted successfully!",
    });
    // }else{
    //     req.flash('error', 'You cannot delete this post!');
    //     return res.redirect('back');
    // }
  } catch (err) {
    console.log("********", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
