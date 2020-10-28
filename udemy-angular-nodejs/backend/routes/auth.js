const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { restart } = require('nodemon');

router.post('/signup', (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: hash,
    });
    user.save()
        .then((result) => res.status(201).json({ message: 'created', result: result }))
        .catch((error) => res.status(500).json({ message: 'failed', error: error }));
});

router.post('/login', (req, res, next) => {
    let fUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            fUser = { ...user };
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            // console.info(fUser);
            const token = jwt.sign({ email: fUser.email, userId: fUser._id }, 'secret-this-should-be-longer', {
                expiresIn: '1h',
            });
            res.status(200).json({ token: token, expiresIn: 3600 });
        })
        .catch((error) => res.status(401).json({ message: error }));
});

module.exports = router;
