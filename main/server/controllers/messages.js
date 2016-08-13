var mongoose = require('mongoose');
var User = mongoose.model('User');

//Only 10 messages are currently allowed to exist at once
module.exports.sendMessage = function (req, res) {
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                user.messages.push(req.body);
                if(user.messages.length > 10){
                    user.messages.splice(0, 1);
                }
                user.save();
                res.status(200).json({message : 'message went through'});
            }
        });
};

module.exports.deleteMessage = function (req, res) {

};

module.exports.removeExpiredMessages = function (req, res) {

};