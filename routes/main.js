const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const postsController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/feed", ensureAuth, postsController.getFeed);

router.get("/profile", ensureAuth, postsController.getProfile);

router.get("/bookmark", ensureAuth, postsController.getBookmark);

router.get("/user/:userId", ensureAuth, postsController.getUserPage);

router.get("/login", ensureGuest, authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/logout", authController.logout);

router.get("/create", postsController.getCreate)

module.exports = router;