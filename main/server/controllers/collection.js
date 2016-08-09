var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');

module.exports.getCollection = function (req, res) {
    var characters = JSON.parse(fs.readFileSync('./main/server/config/characters.json', 'utf8')).characters;
    User
        .findOne({username : req.params.id})
        .exec(function(err, user){
            if(err){
                res.status(400).json(err);
            }
            else {
                var collection = user.characters;
                var binaryCollection = new Array();
                for(var i = 0; i < collection.length; i++){
                    var num = parseInt(collection.charAt(i), 16);
                    for(var j = 0; j < 4; j++){
                        if(num < 0){
                            binaryCollection.unshift(0);
                        } else {
                            binaryCollection.unshift(Math.floor(num % 2));
                            num = Math.floor(num / 2);
                        }
                    }
                    binaryCollection.reverse();
                }
                for(var i = characters.length - 1; i >= 0; i--){
                    if(!binaryCollection[i]){
                       characters.splice(i, 1);
                    }
                }
                res.status(200).json({collection : characters});
            }
        });
};