var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getMissions = function (req, res) {
    User
        .findOne({username : req.params.id})
        .exec(function(error, user){
            if(error){
                res.status(400).json(error);
            }
            else {
                var missions = user.missions;
                res.status(200).json({missions : missions});
            }
        });
};