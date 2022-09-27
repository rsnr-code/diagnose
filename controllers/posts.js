const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().populate("user").sort({ createdAt: "desc" }).lean();
      res.render("feed", { posts: posts});
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
    const post = await Post.findById(req.params.id);
    res.render("post", { post: post, user: req.user });
  } catch (err) {
    console.log(err);
  }
},

getProfile: async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.render("profile", { posts: posts, user: req.user });
  } catch (err) {
    console.log(err);
  }
},

// getUserPage: async (req, res) => {
//   try {
//     const posts = await Post.find({
//       user: req.params.userId,
//     })
//     .populate("user")
//         .lean();

//     res.render("userpage", {
//       posts,
//       user: req.params.userId
//     });

//   } catch (err) {
//     console.error(err);
    
//   }
// },
};
