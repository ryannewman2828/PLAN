var mongoose = require('mongoose');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
var User = require('../../../main/server/model/users');

process.env.mode = 'TESTING';

mockgoose.prepareStorage().then(function() {
    mongoose.connect('mongodb://localhost/plan');
});

// Creates a user, stores it in the mocked database and returns it
module.exports.createUser = function (username, online, friends) {
    var newUser = new User();

    newUser.local.username = username;
    newUser.setPassword("test");
    newUser.online = online;
    newUser.friends = friends;

    newUser.save();

    return newUser;
};

module.exports.deleteUser = function (id) {
    User.remove({_id: id}, function(err) {});
};

module.exports.deleteUsers = function () {
    User.remove({}, function(err) {});
};
