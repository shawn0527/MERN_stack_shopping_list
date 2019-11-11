const express = require('express');
const router = express.Router();

//User Model
const User = require('../../models/User');

//@router POST api/users
//@desc Register new user
//@acess Public
router.post('/', (req, res) => {
    res.send('register')
});

module.exports = router;