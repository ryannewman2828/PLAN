var mongoose = require('mongoose');
var mockgoose = require("mockgoose-mongoose4")
mockgoose(mongoose);
require('../main/server/model/db');


var User = require('../main/server/model/users');


var assert = require('chai').assert;
describe('wser', function() {
    describe('#wer()', function() {
        it('should return -1 when the value is not present', function(done) {
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
            done();
        });
    });
});