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
                if (err) {
                    res.status(400).json(err);
                } else if(!user) {
                    res.status(400).json({
                       "message" : "InvalidRequestError: Invalid Token"
                    });
                } else {
                    res.status(200).json(user);
                }
            });
    }

};

module.exports.onlineUsers = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        User
            .find({online : true})
            .exec(function(err, users) {
                if (err){
                    res.status(400).json(err);
                } else {
                    users = users.map(function (user) {
                        return user.local.username;
                    });
                    res.status(200).json(users);
                }
            });
    }
};
