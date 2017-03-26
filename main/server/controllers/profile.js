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

module.exports.onlineUsers = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message" : "Invalid access token"
        });
    } else {
        User
            .find({online : true})
            .exec(function(err, users) {
                users = users.map(function (user) {
                    return user.local.username;
                });
                res.status(200).json(users);
            });
    }
};
