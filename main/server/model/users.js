var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	local : {
		username: {
			type: String,
			unique: true,
			required: true
		},
		hash: {
			type: String,
			required: true
        },
		salt: {
			type: String,
			required: true
        }
	},
    online: {
        type: Boolean,
        required: true
    },
    friends: {
		type: Array
	}
});

userSchema.methods.setPassword = function(password){
	this.local.salt = crypto.randomBytes(16).toString('hex');
	this.local.hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64, 'sha512').toString('hex');
	return this.local.hash === hash;
};

userSchema.methods.generateJwt = function () {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	// TODO: Move SECRET to an external file
	return jwt.sign({
		_id: this._id,
		username: this.local.username,
		exp: parseInt(expiry.getTime() / 1000)
	}, "SECRET");
};

module.exports = mongoose.model('User', userSchema);
