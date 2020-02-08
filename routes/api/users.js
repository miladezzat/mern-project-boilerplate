const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//Item Model
const UserModel = require('../../models/User');

/**
 * @route GET api/users
 * @description Register new user
 * @access Public
 */
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    // Simple validation 
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please Enter all Fields' });
    }
    //Check for existing user
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: "User already exist" })
            }
            const newUser = new UserModel({
                name,
                email,
                password
            })
            //Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email:user.email
                                }
                            });
                        })
                })
            })

        })
});

module.exports = router;