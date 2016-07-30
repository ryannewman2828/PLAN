var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.sendMessage = function (req, res) {
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                user.messages.push(req.body);
                user.save();
                res.status(200).json({message : 'message went through'});
            }
        });
};

module.exports.getMessages = function (req, res) {

}

module.exports.deleteMessage = function (req, res) {

};

module.exports.removeExpiredMessages = function (req, res) {

};