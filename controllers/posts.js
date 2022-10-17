const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Bookmark = require("../models/Bookmark");
const moment = require("moment");

const { formatDate } = require("../helpers/ejs");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
      const comments = await Comment.find()
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();

      res.render("feed", { posts: posts, comments: comments, moment });
    } catch (err) {
      console.error(err);
      res.render("error/404");
    }
  },

  getBookmark: async (req, res) => {
    try {
      const bookmarks = await Bookmark.find({ user: req.user.id })
        .populate("post")
        .lean();
      const post = await Post.find().populate("user");

      res.render("bookmark", { bookmarks: bookmarks, moment, post });
    } catch (err) {
      console.error(err);
      res.render("error/404");
    }
  },

  getCreate: async (req, res) => {
    try {
      res.render("create");
    } catch (err) {
      console.error(err);
      res.render("error/404");
    }
  },

  createPost: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });

      res.redirect("/feed");
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("user").lean();
      const comment = await Comment.find({ post: req.params.id })
        .populate("user")
        .sort({ createdAt: "asc" })
        .lean();
      const bookmark = await Bookmark.find({ post: req.params.id });

      res.render("post", {
        post: post,
        user: req.user,
        comment: comment,
        formatDate,
        bookmark,
      });
    } catch (err) {
      console.error(err);
      res.render("error/404");
    }
  },

  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const comments = await Comment.find({ user: req.user.id }).sort({
        createdAt: "desc",
      });

      res.render("profile", {
        posts: posts,
        user: req.user,
        comments,
        formatDate,
        moment,
      });
    } catch (err) {
      console.error(err);
      res.render("error/404");
    }
  },

  getUserPage: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.userId })
        .populate("user")
        .lean();
      const user = await User.findById(req.params.userId);
      const comments = await Comment.find({ user: req.params.userId }).sort({
        createdAt: "desc",
      });

      res.render("profile", {
        posts,
        user,
        comments,
        formatDate,
        moment,
      });
    } catch (err) {
      console.error(err);
      res.render("error/404");
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
     
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },

  bookmarkPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      await Bookmark.create({
        post: post,
        user: req.user.id,
      });

      res.redirect("back");
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await Post.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(post.cloudinaryId);
      await Post.remove({ _id: req.params.id });
      
      res.redirect("/feed");
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },

  createComment: async (req, res) => {
    try {
      await Comment.create({
        body: req.body.body,
        user: req.user.id,
        post: req.params.id,
      });

      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
      res.render("error/500");
    }
  },
};
