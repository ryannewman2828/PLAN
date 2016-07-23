var assert = require('chai').assert;
var mongoose = require('mongoose');
var mockgoose = require("mockgoose-mongoose4");

mockgoose(mongoose);
mongoose.connect('mongodb://username:password@ds015335.mlab.com:15335/userbase');
require('../main/server/model/db');

var User = mongoose.model('User');

beforeEach(function(done) {
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
                if(!e){
                    assert(false);
                }
                done();
            });
        });
    });
});