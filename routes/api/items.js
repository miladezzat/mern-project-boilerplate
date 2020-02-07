const express = require('express');
const router = express.Router();

//Item Model
const ItemModel = require('../../models/Items');

/**
 * @route GET api/items
 * @description Get All Items
 * @access Public
 */
router.get('/', (req, res) => {
    ItemModel.find({})
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.json(err))
});
/**
 * @route POST api/items
 * @description Create An Item
 * @access Public
 */
router.post('/', (req, res) => {
    const newItem = new ItemModel({
        name: req.body.name,
    })
    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.json(err))
});



module.exports = router;