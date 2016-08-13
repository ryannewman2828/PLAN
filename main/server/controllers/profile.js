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
    
};

module.exports.changeEmail = function (req, res) {
    // TODO some email checking and eventually send a new confirmation email
    User
        .findOne({email : req.body.email}, function (err, user) {
            if(err){
                res.status(400).json(err);
            } else {
                if(user){
                    res.status(400).json({message : "email is already been taken"});
                } else {
                    User.update({ username : req.body.username }, { $set: { email: req.body.email }}, function () {
                        res.status(200).json({message : "request sent successfully"});
                    });
                }
            }
        });
};

module.exports.changeProfilePic = function (req, res) {
    
}