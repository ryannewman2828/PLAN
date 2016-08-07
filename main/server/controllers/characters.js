var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('../server/config/characters.json', 'utf8'));

module.exports.getCharacters = function (req, res) {
    res.status(200).json(obj);
};