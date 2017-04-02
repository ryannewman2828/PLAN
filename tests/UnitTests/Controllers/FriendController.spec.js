var testBase = require("./ControllerTestBase");
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var app = require('../../../main/app');

chai.use(chaiHttp);

describe('View Friends', function() {
    it('should give a 401 if not authenticated on /friends GET');
    it('should return a 400 when given an incorrect token /friends GET');
    it('should return the friends when authenticated on /friends GET');
    it('should return nothing if everyone is not your friend on /friends GET');
    it('should return everything if everyone is your friend on /friends GET');
});

describe('View Online Friends', function() {
    it('should give a 401 if not authenticated on /friends/online GET');
    it('should return a 400 when given an incorrect token /friends/online GET');
    it('should return the online friends when authenticated on /friends/online GET');
    it('should return nothing if everyone is online but not your friend on /friends/online GET');
    it('should return nothing if everyone is your friend but not online on /friends/online GET');
    it('should return everything if everyone is your friend and online on /friends/online GET');
    it('should return only online friends if you have offline friend and online non-friends /friends/online GET');
});

describe('Send Friend Request', function() {
    it('should give a 401 if not authenticated on /friends/request/:id GET');
    it('should return a 400 when given an empty :id /friends/request/:id GET');
    it('should return a 400 if the friend request was already sent on /friends/request/:id GET');
    it('should return a 400 if the friend request was already sent to you on /friends/request/:id GET');
    it('should return a 201 if the friend request was sent successfully on /friends/request/:id GET');
});

describe('Accept Friend Request', function() {
    it('should give a 401 if not authenticated on /friends/accept/:id GET');
    it('should return a 400 when given an empty :id /friends/accept/:id GET');
    it('should return a 400 if there is no friend request on /friends/accept/:id GET');
    it('should return a 200 if the friend request was accepted successfully on /friends/accept/:id GET');
});

describe('Decline Friend Request', function() {
    it('should give a 401 if not authenticated on /friends/decline/:id GET');
    it('should return a 400 when given an empty :id /friends/decline/:id GET');
    it('should return a 200 if the friend request was declined successfully on /friends/decline/:id GET');
});

describe('View Friend Requests', function() {
    it('should give a 401 if not authenticated on /friends/requests/get GET');
    it('should return the users friend requests on /friends/requests/get GET');
});

describe('View Pending Friend Request', function() {
    it('should give a 401 if not authenticated on /friends/requests/sent GET');
    it('should return the users sent friend requests on /friends/requests/sent GET');
});