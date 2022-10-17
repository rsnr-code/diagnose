const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

router.get("/:id", ensureAuth, postsController.getPost);
router.post("/createPost", upload.single("file"), postsController.createPost);
router.put("/likePost/:id", postsController.likePost);
router.post("/bookmarkPost/:id", postsController.bookmarkPost);
router.delete("/deletePost/:id", postsController.deletePost);
router.post("/:id", postsController.createComment);

module.exports = router;