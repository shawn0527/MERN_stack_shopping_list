const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

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

//@router POST api/items
//@desc Create A Item
//@acess Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

//@router DELETE api/items
//@desc Delete A Item
//@acess Private
router.delete('/:id', auth, (req, res) => {
   Item.findById(req.params.id)
     .then(item => item.remove().then(() => res.json({sucess: true})))
     .catch(err => res.status(404).json({error: 'Item not found'}))
});
  
module.exports = router;