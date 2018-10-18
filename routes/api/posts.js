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
    .catch(() => res.status(404).json({ error: "Posts not found" }));
});

//GET fetch single post by ID - public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ error: "Post not found" }));
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

//DELETE  remove post by ID - authenticated
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if user is authorized to delete post
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized user" });
          }
          //remove post
          post
            .remove()
            .then(() => res.json({ success: "Post removed successfully" }));
        });
      })
      .catch(() => res.status(404).json({ error: "Post not found" }));
  }
);

//POST create like by ID - authenticated
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if user has already liked post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ error: "User has already liked this post" });
          }
          //add user ID to likes array
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        });
      })
      .catch(() => res.status(404).json({ error: "Post not found" }));
  }
);

//POST remove like by ID - authenticated
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check if user has already liked post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ error: "User has not liked this post" });
          }
          //remove like out of array
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //splice out selected id for removal
          post.likes.splice(removeIndex, 1);

          //save post
          post.save().then(post => res.json(post));
        });
      })
      .catch(() => res.status(404).json({ error: "Post not found" }));
  }
);

//POST create a comment - authenticated
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //check validation
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.body.id
        };
        //add new comment to comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(() => res.json({ error: "Post not found" }));
  }
);

//DELETE remove a comment from post - authenticated
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //check if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ error: "Comment not found" });
        }
        //remove comment out of comments array
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //splice out selected id for removal
        post.comments.splice(removeIndex, 1);

        //save post
        post.save().then(post => res.json(post));
      })
      .catch(() => res.json({ error: "Post not found" }));
  }
);

module.exports = router;
