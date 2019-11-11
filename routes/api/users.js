const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//User Model
const User = require("../../models/User");

//@router POST api/users
//@desc Register new user
//@acess Public
router.post("/", (req, res) => {
  const { username, email, password } = req.body;

  //Simple validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email, username }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      username,
      email,
      password
    });

    //Create sali & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => {
              res.json({
                  user: {
                      id: user.id,
                      username: user.username,
                      email: user.email
                  }
              })
          })
      });
    });
  });
});

module.exports = router;
