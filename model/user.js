const mongoose = require("mongoose");
const multer = require("multer");
const { dirname } = require("path");
const path = require("path");
const AVATAR_PATH=path.join('uploads/users/avatars')
const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },

    name: {
      required: true,
      type: String,
    },

    avatar:{
      type:String,

    },

    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);


// multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', AVATAR_PATH))
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' +Date.now() )
  }
})

// static methods
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar')
userSchema.statics.avatarPath=AVATAR_PATH;



const User = mongoose.model("User", userSchema);
module.exports = User;
