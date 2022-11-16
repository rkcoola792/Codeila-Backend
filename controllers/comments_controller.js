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
          console.log("coomets", post);
          post.comment.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

          // saving the post id first of the comment before deleting it
            let postId = comment.post;

            comment.remove();

          // Finding the comment in the post and pulling out the desired comment from post comment's array
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}