const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ message: "Users works" }));

//register user
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm" //default image if no image is provided
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password.toLowerCase(),
        avatar,
        date: req.body.date
      });

      //hash the password, then if no errs, create the user
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//login user with jwt token
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    //compares validation between login password and database password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          keys.secretKey,
          { expiresIn: "24h" },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

//create protected routes using Passport.js
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name
    });
  }
);

module.exports = router;
