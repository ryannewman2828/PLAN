var fs = require('fs');
var chapters = JSON.parse(fs.readFileSync('./main/server/config/lore.json', 'utf8')).chapters;

module.exports.getLoreChapters = function (req, res) {
    var headers = chapters.map(function (chapter) {
        return chapter.chapter;
    });
    res.status(200).json(headers);
};

module.exports.getLoreBody = function (req, res) {
    chapter = req.params.id;
    for (var i = 0; i < chapters.length; i++){
        if(chapters[i].chapter === chapter){
            console.log(chapters[i].content);
            res.status(200).json(chapters[i].content);
        }
    }
};