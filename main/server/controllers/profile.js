var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }

};

module.exports.viewProfile = function (req, res) {
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                res.status(200).json(user);
            }
        });
};

module.exports.changePassword = function (req, res) {
    if(req.body.passwords.newPass !== req.body.passwords.confirmPass){
        req.status(400).json({message : "Passwords don't match"});
    } else {
        User
            .findOne({username : req.body.user.username}, function (err, user) {
                if(err){
                    res.status(400).json(err);
                } else {
                    if(!user.verifyPassword(req.body.passwords.origPass)){
                        res.status(400).json({message : "The password you entered is incorrect"});
                    } else {
                        user.setPassword(req.body.passwords.newPass);
                        user.save();
                        res.status(200).json({message : "Password was successfully changed"})
                    }
                }
            })
    }
};

module.exports.changeEmail = function (req, res) {
    // TODO some email checking and eventually send a new confirmation email
    User
        .findOne({email : req.body.email}, function (err, user) {
            if(err){
                res.status(400).json(err);
            } else {
                if(user){
                    res.status(400).json({message : "email has already been taken"});
                } else {
                    User.update({ username : req.body.username }, { $set: { email: req.body.email }}, function () {
                        res.status(200).json({message : "Email was successfully changed"});
                    });
                }
            }
        });
};

module.exports.changeProfilePic = function (req, res) {
    User.update({ username : req.body.username }, { $set: { profilePic : req.body.profilePic }}, function () {
        res.status(200).json({message : "Profile picture was successfully changed"});
    });
};