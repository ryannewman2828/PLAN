var fs = require('fs');
var missions = JSON.parse(fs.readFileSync('./main/server/config/missions.json', 'utf8'));

module.exports.getMissions = function (req, res) {

    //do some computations here



    res.status(200).json(obj);
};