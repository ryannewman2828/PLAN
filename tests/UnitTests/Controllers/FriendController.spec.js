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
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid Token');
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
                res.body.should.include('tester3');
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
                res.body.should.include('tester2');
                res.body.should.include('tester3');
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        done();
    });
});

describe('View Online Friends', function () {
    it('should give a 401 if not authenticated on /friends/online GET', function (done) {
        chai.request(app)
            .get('/api/friends/online')
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
    it('should return a 400 when given an incorrect token /friends/online GET', function (done) {
        chai.request(app)
            .get('/api/friends/online')
            .set('Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJfaWQiOiI1OGUwMjVhMmMwZGViNzBjNTQ5MWY4MzQ' +
                'iLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTQ5MT' +
                'Y4OTUwNiwiaWF0IjoxNDkxMDg0NzA2fQ.' +
                'djaXe_inBp9X3DbsSMOeHl8qfk32l9ig6G6-B9dLrUM')
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid Token');
                done();
            });
    });
    it('should return nothing if everyone is online but not your friend on /friends/online GET', function (done) {
        var user1 = testBase.createUser('tester1', true, []);
        testBase.createUser('tester3', true, []);
        testBase.createUser('tester2', true, []);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/online')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.be.empty;
                done();
            });
    });
    it('should return nothing if everyone is your friend but not online on /friends/online GET', function (done) {
        var user4 = testBase.createUser('tester4', false, []);
        var user3 = testBase.createUser('tester3', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        var user1 = testBase.createUser('tester1', true, [user4._id, user3._id, user2._id]);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/online')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.be.empty;
                done();
            });
    });
    it('should return everything if everyone is your friend and online on /friends/online GET', function (done) {
        var user4 = testBase.createUser('tester4', true, []);
        var user3 = testBase.createUser('tester3', true, []);
        var user2 = testBase.createUser('tester2', true, []);
        var user1 = testBase.createUser('tester1', true, [user4._id, user3._id, user2._id]);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/online')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.include('tester2');
                res.body.should.include('tester3');
                res.body.should.include('tester4');
                done();
            });
    });
    it('should return only online friends if you have offline friend and online non-friends /friends/online GET', function (done) {
        testBase.createUser('tester5', true, []);
        var user4 = testBase.createUser('tester4', true, []);
        var user3 = testBase.createUser('tester3', false, []);
        var user2 = testBase.createUser('tester2', true, []);
        var user1 = testBase.createUser('tester1', true, [user4._id, user3._id, user2._id]);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/online')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.include('tester2');
                res.body.should.include('tester4');
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        done();
    });
});

describe('Send Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/request/:id GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        chai.request(app)
            .get('/api/friends/request/' + user1._id)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
    it('should return a 400 when given an incorrect token on /friends/request/:id GET', function (done) {
        var user = testBase.createUser('foo', false, []);
        chai.request(app)
            .get('/api/friends/request/' + user._id)
            .set('Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJfaWQiOiI1OGUwMjVhMmMwZGViNzBjNTQ5MWY4MzQ' +
                'iLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTQ5MT' +
                'Y4OTUwNiwiaWF0IjoxNDkxMDg0NzA2fQ.' +
                'djaXe_inBp9X3DbsSMOeHl8qfk32l9ig6G6-B9dLrUM')
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid Token');
                done();
            });
    });
    it('should return a 400 when given an incorrect :id on /friends/request/:id GET', function (done) {
        var user = testBase.createUser('tester', false, []);
        jwt = user.generateJwt();
        chai.request(app)
            .get('/api/friends/request/' + '111111111111111111111111')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid :id');
                done();
            });
    });
    it('should return a 400 if the friend request was already sent on /friends/request/:id GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        testBase.createFriendRequest(user1._id, user2._id);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/request/' + user2._id)
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidResponseError: Friend Request Already Sent');
                done();
            });
    });
    it('should return a 400 if the friend request was already sent to you on /friends/request/:id GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        testBase.createFriendRequest(user2._id, user1._id);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/request/' + user2._id)
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidResponseError: Friend Request Already Sent to this User');
                done();
            });
    });
    it('should return a 201 if the friend request was sent successfully on /friends/request/:id GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/request/' + user2._id)
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('Request Sent Successfully');
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        testBase.deleteRequests();
        done();
    });
});

describe('Accept Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/accept/:id GET', function (done) {
        var user = testBase.createUser('tester', false, []);
        chai.request(app)
            .get('/api/friends/accept/' + user._id)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
    it('should return a 400 when given an incorrect token on /friends/accept/:id GET', function (done) {
        var user = testBase.createUser('foo', false, []);
        chai.request(app)
            .get('/api/friends/accept/' + user._id)
            .set('Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJfaWQiOiI1OGUwMjVhMmMwZGViNzBjNTQ5MWY4MzQ' +
                'iLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTQ5MT' +
                'Y4OTUwNiwiaWF0IjoxNDkxMDg0NzA2fQ.' +
                'djaXe_inBp9X3DbsSMOeHl8qfk32l9ig6G6-B9dLrUM')
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid Token');
                done();
            });
    });
    it('should return a 400 when given an incorrect :id on /friends/accept/:id GET', function (done) {
        var user = testBase.createUser('tester', false, []);
        jwt = user.generateJwt();
        chai.request(app)
            .get('/api/friends/accept/' + '111111111111111111111111')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid :id');
                done();
            });
    });
    it('should return a 400 if there is no friend request on /friends/accept/:id GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/accept/' + user2._id)
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidResponseError: No Friend Request');
                done();
            });
    });
    it('should return a 200 if the friend request was accepted successfully on /friends/accept/:id GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        testBase.createFriendRequest(user2._id, user1._id);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/accept/' + user2._id)
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('Accepted successfully');
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        testBase.deleteRequests();
        done();
    });
});

describe('Decline Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/decline/:id GET', function (done) {
        var user = testBase.createUser('tester', false, []);
        chai.request(app)
            .get('/api/friends/decline/' + user._id)
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
    it('should return a 400 when given an incorrect token on /friends/decline/:id GET', function (done) {
        var user = testBase.createUser('foo', false, []);
        chai.request(app)
            .get('/api/friends/decline/' + user._id)
            .set('Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                'eyJfaWQiOiI1OGUwMjVhMmMwZGViNzBjNTQ5MWY4MzQ' +
                'iLCJ1c2VybmFtZSI6InRlc3RlciIsImV4cCI6MTQ5MT' +
                'Y4OTUwNiwiaWF0IjoxNDkxMDg0NzA2fQ.' +
                'djaXe_inBp9X3DbsSMOeHl8qfk32l9ig6G6-B9dLrUM')
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid Token');
                done();
            });
    });
    it('should return a 400 when given an incorrect :id on /friends/decline/:id GET', function (done) {
        var user = testBase.createUser('tester', false, []);
        jwt = user.generateJwt();
        chai.request(app)
            .get('/api/friends/decline/' + '111111111111111111111111')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('InvalidRequestError: Invalid :id');
                done();
            });
    });
    it('should return a 200 if the friend request was declined successfully on /friends/decline/:id GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        testBase.createFriendRequest(user2._id, user1._id);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/decline/' + user2._id)
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.message.should.be.a('string');
                res.body.message.should.be.equal('Declined successfully');
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        testBase.deleteRequests();
        done();
    });
});

describe('View Friend Requests', function () {
    it('should give a 401 if not authenticated on /friends/requests/get GET', function (done) {
        chai.request(app)
            .get('/api/friends/requests/get')
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
    it('should return the users friend requests on /friends/requests/get GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        testBase.createUser('tester3', false, []);
        var user4 = testBase.createUser('tester4', false, []);
        testBase.createFriendRequest(user2._id, user1._id);
        testBase.createFriendRequest(user4._id, user1._id);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/requests/get')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.include(String(user2._id));
                res.body.should.include(String(user4._id));
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        testBase.deleteRequests();
        done();
    });
});

describe('View Pending Friend Request', function () {
    it('should give a 401 if not authenticated on /friends/requests/sent GET', function (done) {
        chai.request(app)
            .get('/api/friends/requests/sent')
            .end(function (err, res) {
                res.should.have.status(401);
                done();
            });
    });
    it('should return the friend requests sent by the user on /friends/requests/sent GET', function (done) {
        var user1 = testBase.createUser('tester1', false, []);
        var user2 = testBase.createUser('tester2', false, []);
        testBase.createUser('tester3', false, []);
        var user4 = testBase.createUser('tester4', false, []);
        testBase.createFriendRequest(user1._id, user2._id);
        testBase.createFriendRequest(user1._id, user4._id);
        var jwt = user1.generateJwt();
        chai.request(app)
            .get('/api/friends/requests/sent')
            .set('Authorization', 'Bearer ' + jwt)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.include(String(user2._id));
                res.body.should.include(String(user4._id));
                done();
            });
    });
    afterEach(function (done) {
        testBase.deleteUsers();
        testBase.deleteRequests();
        done();
    });
});
