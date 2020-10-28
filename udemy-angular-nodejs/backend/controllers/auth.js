const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: hash,
    });
    user.save()
        .then((result) => res.status(201).json({ message: 'created', result: result }))
        .catch((error) => res.status(500).json({ message: 'failed', error: error }));
};

exports.loginUser = (req, res, next) => {
    let fUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            fUser = { email: user.email, _id: user._id };
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            const token = jwt.sign({ email: fUser.email, userId: fUser._id }, process.env.JWT_KEY, {
                expiresIn: '1h',
            });
            res.status(200).json({ token: token, expiresIn: 3600 });
        })
        .catch((error) => res.status(401).json({ message: error }));
};
