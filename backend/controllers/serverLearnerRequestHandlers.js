const Learner = require('../models/learnerModel');
const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signupLearner = (req, res) => {
    Learner.findOne({ username: req.body.username }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Username is taken'
            });
        }

        const { name, username, parentid, password } = req.body;
        let newlearner = new Learner({ name, username, password, parentid});
        newlearner.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            //If success then here
            

            res.json({
                message: 'Learner Successfully Added'
            });
            updateUserWithLearners(newlearner);
        });
    });
};

function updateUserWithLearners(newlearner) {
    User.findById(newlearner.parentid).exec((err, user) => {
        if (user) {
            user.learners.push({name:newlearner.name, id:newlearner._id});
            user.save();
        }
    });

}

exports.returnLearners = (req,res) => {
    const {userid} = req.body;
    User.findById(userid).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with id does not exists. Please signin again'
            });
        }

        return res.json({
            learners: user.learners

        });

    });
}

exports.signinLearner = (req, res) => {
    const { username, password } = req.body;
    // check if user exist
    Learner.findOne({ username }).exec((err, learner) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Learner with that email does not exist. Please signup.'
            });
        }
        // authenticate
        if (!learner.authenticate(password)) {
            return res.status(400).json({
                error: 'username and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: learner._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name} = learner;
        return res.json({
            token,
            learner: { _id, username, name}
        });
    });
};
