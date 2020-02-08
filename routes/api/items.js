const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
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
 * @access private
 */
router.post('/', auth, (req, res) => {
    const newItem = new ItemModel({
        name: req.body.name,
    })
    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.json(err))
});

/**
 * @route DELETE api/items/:id
 * @description Delete An Item
 * @access private
 */
router.delete('/:id', auth, (req, res) => {
    ItemModel.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});


module.exports = router;