const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/auth')
//Item Model
const UserModel = require('../../models/User');

/**
 * @route POST api/auth
 * @description Register new user
 * @access Public
 */
router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Simple validation 
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please Enter all Fields' });
    }
    //Check for existing user
    UserModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: "User Doest not exist" })
            }
            // validatte password 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn: '6h' },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
});

/**
 * @route GET api/auth/user
 * @description Get user gata
 * @access private
 */
router.get('/user', auth, (req, res) => {
    UserModel.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

module.exports = router;