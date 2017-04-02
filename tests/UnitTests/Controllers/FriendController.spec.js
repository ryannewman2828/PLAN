var testBase = require("./ControllerTestBase");
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../../../main/app');

chai.use(chaiHttp);

describe('View Friends', function () {
    it('should give a 401 if not authenticated on /friends GET', function (done) {
        chai.request(app)
            .get('/api/friends')
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
    it('should return a 400 when given an incorrect token /friends GET', function (done) {
        chai.request(app)
            .get('/api/friends')
            .set('Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJfaWQiOiI1OGUwMjVhMmMwZGViNzBjNTQ5MWY4MzQ' +
                'iLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTQ5MT' +
                'Y4OTUwNiwiaWF0IjoxNDkxMDg0NzA2fQ.' +
                'djaXe_inBp9X3DbsSMOeHl8qfk32l9ig6G6-B9dLrUM')
            .end(function (err, res) {
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid Token');
                res.should.have.status(400);
                done();
            });
    });
    it('should return the friends when authenticated on /friends GET', function (done) {
        var user3 = testBase.createUser('tester3', false, []);
        var user1 = testBase.createUser('tester1', false, [user3._id]);
        testBase.createUser('tester2', false, []);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.contain('tester3');
                done();
            });
    });
    it('should return nothing if everyone is not your friend on /friends GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        testBase.createUser('tester3', false, []);
        testBase.createUser('tester2', false, []);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.be.empty;
                done();
            });
    });
    it('should return everything if everyone is your friend on /friends GET', function (done) {
        var user3 = testBase.createUser('tester3', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        var user1 = testBase.createUser('tester1', false, [user3._id, user2._id]);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.contain('tester2');
                res.body.should.contain('tester3');
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        done();
    });
});

describe('View Online Friends', function () {
    it('should give a 401 if not authenticated on /friends/online GET');
    it('should return a 400 when given an incorrect token /friends/online GET');
    it('should return the online friends when authenticated on /friends/online GET');
    it('should return nothing if everyone is online but not your friend on /friends/online GET');
    it('should return nothing if everyone is your friend but not online on /friends/online GET');
    it('should return everything if everyone is your friend and online on /friends/online GET');
    it('should return only online friends if you have offline friend and online non-friends /friends/online GET');
});

describe('Send Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/request/:id GET');
    it('should return a 400 when given an empty :id /friends/request/:id GET');
    it('should return a 400 if the friend request was already sent on /friends/request/:id GET');
    it('should return a 400 if the friend request was already sent to you on /friends/request/:id GET');
    it('should return a 201 if the friend request was sent successfully on /friends/request/:id GET');
});

describe('Accept Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/accept/:id GET');
    it('should return a 400 when given an empty :id /friends/accept/:id GET');
    it('should return a 400 if there is no friend request on /friends/accept/:id GET');
    it('should return a 200 if the friend request was accepted successfully on /friends/accept/:id GET');
});

describe('Decline Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/decline/:id GET');
    it('should return a 400 when given an empty :id /friends/decline/:id GET');
    it('should return a 200 if the friend request was declined successfully on /friends/decline/:id GET');
});

describe('View Friend Requests', function () {
    it('should give a 401 if not authenticated on /friends/requests/get GET');
    it('should return the users friend requests on /friends/requests/get GET');
});

describe('View Pending Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/requests/sent GET');
    it('should return the users sent friend requests on /friends/requests/sent GET');
});