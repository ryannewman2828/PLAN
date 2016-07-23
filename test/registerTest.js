var assert = require('chai').assert;
var mongoose = require('mongoose');
var mockgoose = require("mockgoose-mongoose4");

require('../main/server/model/db');
mockgoose(mongoose);
require('../main/server/model/users');

var User = mongoose.model('User');

before(function(done) {
    mockgoose.reset();
    user = new User({email:'secret', username:'errr', name:'ee'});
    user.save(function(err, user){
        if (err) return console.error(err);
    });
    done();
});

describe('Blah', function() {
    describe('Bleh', function () {
        it('should not fail', function (done) {
            User.findOne({email : 'secret'}, function (err, e) {
                console.log(e);
                if(!e){
                    assert(false);
                }
                done();
            });
        });
    });
});