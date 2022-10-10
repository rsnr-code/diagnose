const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require('../models/Comment');
const User = require('../models/User');
const moment = require('moment')

const {
  formatDate
} = require("../helpers/ejs");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().populate("user").sort({ createdAt: "desc" }).lean();
      const comments = await Comment.find().populate("user").sort({ createdAt: "desc" }).lean();
      res.render("feed", { posts: posts, comments: comments, moment});
    } catch (err) {
      console.log(err);
    }
  },

  getBookmark: async (req, res) => {
    try {
      res.render("bookmark");
    } catch (err) {
      console.log(err);
    }
  },

  getCreate: async (req, res) => {
      try {
      res.render("create");
    } catch (err) {
    console.log(err);
    }
},

  createPost: async (req, res) => {
    try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    await Post.create({
      title: req.body.title,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      caption: req.body.caption,
      likes: 0,
      user: req.user.id,
    });
    console.log("Post has been added!");
    res.redirect("/feed");
  } catch (err) {
    console.log(err);
  }
},

getPost: async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user").lean();
    const comment = await Comment.find({post: req.params.id}).populate("user").sort({ createdAt: "desc" }).lean();
    res.render("post", { post: post, user: req.user, comment: comment, formatDate });
  } catch (err) {
    console.log(err);
  }
},

getProfile: async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    const comments = await Comment.find({user: req.user.id}).sort({ createdAt: "desc" })
    
    res.render("profile", { posts: posts, user: req.user, comments,
      formatDate });
    
  } catch (err) {
    console.log(err);
  }
},

getUserPage: async (req, res) => {
  try {
    const posts = await Post.find( {user: req.params.userId} ).populate("user").lean();
    const user = await User.findById(req.params.userId)
    const comments = await Comment.find({user: req.params.userId}).sort({ createdAt: "desc" })

    res.render("profile", {
      posts,
      user,
      comments,
      formatDate
    });

  } catch (err) {
    console.error(err);
    
  }
},

likePost: async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
      }
    );
    console.log("Likes +1");
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
},
deletePost: async (req, res) => {
  try {
    // Find post by id
    let post = await Post.findById({ _id: req.params.id });
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinaryId);
    // Delete post from db
    await Post.remove({ _id: req.params.id });
    console.log("Deleted Post");
    res.redirect("/feed");
  } catch (err) {
    res.redirect("/feed");
  }
},

createComment: async (req, res) => {
  try {
   await Comment.create({
      body: req.body.body,
      user: req.user.id,
      post: req.params.id
    });
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.error(err);
  }
},
};
