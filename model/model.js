var mongoose = require('mongoose');

var modelSchema = new mongoose.Schema({
	name: String,
	completed: Boolean
	note: String
});
module.exports = mongoose.model('Model', modelSchema);
