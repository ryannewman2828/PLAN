var mongoose = require('mongoose');
var fs = require('fs');
var missions = JSON.parse(fs.readFileSync('./main/server/config/missions.json', 'utf8')).missions;
var User = mongoose.model('User');

module.exports.getMissions = function (req, res) {
    User
        .findOne({username : req.params.id})
        .exec(function(error, user){
            if(error){
                res.status(400).json(error);
            }
            else {
                var userMissions = user.missions;
                var displayMissions = [];
                for(var i = 0; i < missions.length; i++){
                    if(missions[i].id === userMissions[0].id){
                        var criteria = userMissions[0].progress;
                        for(var j = 0; j < criteria.length; j++){
                            criteria[j].wins = criteria[j].wins + "/" + missions[i].criteria[j].wins;
                        }
                        displayMissions.push({
                            name : missions[i].name,
                            description : missions[i].description,
                            unlockable : missions[i].unlockable,
                            criteria : criteria
                        });
                        userMissions.splice(0,1);
                    }
                }
                res.status(200).json({missions : displayMissions});
            }
        });
};