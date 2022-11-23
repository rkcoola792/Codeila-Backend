// const { name } = require("ejs");
// const { populate } = require("../model/post");
const Post = require("../model/post");
const User = require("../model/user");

module.exports.home = async function (req, res) {

  try{// console.log(req.cookies);
    // res.cookie("name", "Kumar");
    // Post.find({}, function (err, posts) {
    //   res.render("home", { title: "Codeial||Home", posts: posts });
    // });
  
    // populate the user of each posts
     let posts= await Post.find({})
     .sort('-createdAt')
      .populate({ path: "user" })
      .populate({
        path: "comment",
        populate: {
          path: "user",
        },
      })
      // .exec(function (err, posts) {
      //   // console.log("line 16", posts);
      //   // res.status(200).json({ posts });
      // User.find({}, function (err, users) {
      //   res.render("home", {
      //     title: "Codeial||Home",
      //     posts: posts,
      //     all_users: users,
      //   });
      // });
  
        
      // });
  
      let users=await User.find({} )
        
      res.render("home", {
        title: "Codeial||Home",
        posts: posts,
        all_users: users,
      });}
  
  
      catch(err){
        console.log(err)
        return
      }


  
    
};
