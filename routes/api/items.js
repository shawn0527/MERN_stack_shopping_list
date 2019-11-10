const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

//@router GET api/items
//@desc Get All Items
//@acess Public
router.get('/', (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items))
});
  
module.exports = router;