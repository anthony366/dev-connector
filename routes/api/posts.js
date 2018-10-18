const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/posts");

router.get("/test", (req, res) => res.json({ message: "Posts works" }));

//GET fetch all posts - public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ message: "Posts not found" }));
});

//GET fetch single post by ID - public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ message: "Post not found" }));
});

//POST create posts - authenticated
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check validation
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//DELETE  post by ID - authenticated
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if user is authorized to delete post
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized user" });
          }
          //remove post
          post
            .remove()
            .then(() => res.json({ success: "Post removed successfully" }));
        });
      })
      .catch(() => res.status(404).json({ message: "Post not found" }));
  }
);

module.exports = router;
