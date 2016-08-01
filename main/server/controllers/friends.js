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

module.exports.acceptFriend = function (req, res) {
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
                    user.pendingFriends.splice(user.pendingFriends.indexOf(sender), user.pendingFriends.indexOf(sender) + 1);
                    if(user.friends.some(function (friend) { return friend === sender; })){
                        res.status(409).json({error : 'Friend already exists'});
                    } else {
                        user.friends.push(sender);
                        user.save();
                        res.status(200).json({message : 'request went through'})
                    }
                }
            }
        });
};

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
                    user.pendingFriends.splice(user.pendingFriends.indexOf(sender), user.pendingFriends.indexOf(sender) + 1);
                    user.save();
                    res.status(200).json({message : 'request went through'});
                }
            }
        });
};

module.exports.deleteFriend = function (req, res) {
    var sender = req.body.sender;
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                if(!user.friends.some(function (friend) { return friend === sender; })){
                    res.status(404).json({error : 'No such user exists'});
                } else {
                    user.friends.splice(user.friends.indexOf(sender), user.friends.indexOf(sender) + 1);
                    user.save();
                    res.status(200).json({message : 'request went through'});
                }
            }
        });
};