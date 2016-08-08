var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.addFriend = function (req, res) {
    var sender = req.body.sender;
    var checkExists = function (friend) {
        return friend === sender;
    };
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                if(user.pendingFriends.some(checkExists)){
                    res.status(409).json({error : 'Already sent a request'});
                } else if(user.friends.some(checkExists)) {
                    res.status(409).json({error : 'Already friends'});
                } else {
                    user.pendingFriends.push(sender);
                    user.save();
                    res.status(200).json({message : 'request went through'});
                }
            }
        });
};

// Removes tbe friend/sender from both peoples pending lists and adds them to the friends list
module.exports.acceptFriend = function (req, res) {
    var sender = req.body.sender;
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                if (user.pendingFriends.some(function (friend) {return friend === sender;})) {
                    user.pendingFriends.splice(user.pendingFriends.indexOf(sender), 1);
                    if (!user.friends.some(function (friend) {return friend === sender;})) {
                        user.friends.push(sender);
                    }
                }
                user.save();
            }
        })
        .then(function () {
            User
                .findOne({username : sender})
                .exec(function(err, user2){
                    if(err){
                        res.status(400).json(err);
                    }
                    else {
                        if (user2.pendingFriends.some(function (friend) {return friend === req.params.id;})) {
                            user2.pendingFriends.splice(user2.pendingFriends.indexOf(req.params.id), 1);
                        }
                        if (!user2.friends.some(function (friend) {return friend === req.params.id;})) {
                            user2.friends.push(req.params.id);
                        }
                        user2.save();
                        res.status(200).json({message : 'request went through'});
                    }
                });
        });
};

//removes from the users pending list
module.exports.rejectFriend = function (req, res) {
    var sender = req.body.sender;
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                if(!user.pendingFriends.some(function (friend) { return friend === sender; })){
                    res.status(404).json({error : 'No such user exists'});
                } else {
                    user.pendingFriends.splice(user.pendingFriends.indexOf(sender), 1);
                    user.save();
                    res.status(200).json({message : 'request went through'});
                }
            }
        });
};

// Removes from both peoples friends list
module.exports.deleteFriend = function (req, res) {
    var sender = req.body.sender;
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                if (user.friends.some(function (friend) {return friend === sender;})) {
                    user.friends.splice(user.friends.indexOf(sender), 1);
                }
                user.save();
            }
        })
        .then(function () {
            User
                .findOne({username : sender})
                .exec(function(err, user2){
                    if(err){
                        res.status(400).json(err);
                    }
                    else {
                        if(user2.friends.some(function (friend) { return friend === req.params.id; })){
                            user2.friends.splice(user2.friends.indexOf(req.params.id), 1);
                        }
                        user2.save();
                        res.status(200).json({message : 'request went through'});
                    }
                });
    });
};