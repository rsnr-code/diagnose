const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {
  getFeed: async (req, res) => {
        try {
          
          res.render("feed");
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



}
