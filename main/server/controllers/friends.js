var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.addFriend = function (req, res) {
    var sender = req.body.sender;
    var a = function (friend) {
        return friend === sender;
    }
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                if(user.pendingFriends.some(a)){
                    res.status(409).json({error : 'Already sent a request'});
                } else if(user.friends.some(a)) {
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
    
};

module.exports.deleteFriend = function (req, res) {

};