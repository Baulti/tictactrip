const bcrypt = require('bcrypt');
const B_CRYPT_SALT = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

signup = (req, res, next) => {
    req.body = JSON.parse(req.body);
    bcrypt.hash(req.body.password, B_CRYPT_SALT)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then((data) => {
                    res.status(201).json({
                        message: 'User created with success',
                        data: data
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        message: 'Error during user creation',
                        error: error
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Server error during create user',
                error: error
            });
        });
};
login = (req, res, next) => {
    req.body = JSON.parse(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(400).json({
                    message: 'Incorrect mail login',
                    error: {}
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, valid) => {
                    if (!err) {
                        if (valid) {
                            res.status(200).json({
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '365d' }
                                )
                            });
                        } else {
                            res.status(400).json({
                                message: 'Incorrect password'
                            });
                        }
                    } else {
                        console.error(err);
                        res.status(500).json({
                            message: 'Server error during login, cannot decrypte password',
                            error: err
                        });
                    }
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Server error during login',
                error: error
            });
        });
};

tokenAuth = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(!bearerHeader){
        res.status(400).json({
            message: 'Invalid token !'
        });
    }
    const token = bearerHeader.split(' ')[1];
    const tokenDecoded = jwt.decode(token);
    

    if (!tokenDecoded) {
        res.status(400).json({
            message: 'Invalid token !'
        });
    } else {
        User.findOne({ _id: tokenDecoded.userId })
            .then((data) => {
                if (!data) {
                    res.status(404).json({
                        message: 'User not found'
                    });
                } else {
                    next();
                }
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Server error during get user with token',
                    error: error
                });
            });
    }
};

module.exports = { tokenAuth, signup, login }
