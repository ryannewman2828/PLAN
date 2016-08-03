/*
var chai = require('chai');

var assert = chai.assert;
var should = chai.should();
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var mockgoose = require("mockgoose-mongoose4");

chai.use(chaiHttp);

mockgoose(mongoose);
mongoose.connect('mongodb://username:password@ds015335.mlab.com:15335/userbase');
require('../main/server/model/db');

var app = require('../main/app');

var User = mongoose.model('User');

describe('Registration', function() {
    beforeEach(function() {
        //mockgoose.reset();
    });
    describe('Register a new user', function () {
        it('Register with correct params should return 200', function () {
            mockgoose.reset();
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "fake@gmail.com",
                    password : "password",
                    confirmPass : "password"
                })
                .end(function (err, res) {
                    chai.expect(err).to.be.null;
                    chai.expect(res).to.have.status(200);
                });
        });
    });
    describe('Register with blank fields', function () {
        it('Register with an empty username should return a 400', function () {
            mockgoose.reset();
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "",
                    email : "fake@gmail.com",
                    password : "password",
                    confirmPass : "password"
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(['One or more fields have been left blank' ]);
                });
        });
        it('Register with an empty email should return a 400', function () {
            mockgoose.reset();
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "",
                    password : "password",
                    confirmPass : "password"
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(['One or more fields have been left blank' ]);
                });
        });
        it('Register with an empty password should return a 400', function () {
            mockgoose.reset();
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "fake@gmail.com",
                    password : "",
                    confirmPass : "password"
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(['One or more fields have been left blank', "Passwords don't match"]);
                });
        });
        it('Register with an empty confirm password should return a 400', function () {
            mockgoose.reset();
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "fake@gmail.com",
                    password : "password",
                    confirmPass : ""
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(['One or more fields have been left blank', "Passwords don't match"]);
                });
        });
        it('Register with all fields empty should return a 400', function () {
            mockgoose.reset();
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "",
                    email : "",
                    password : "",
                    confirmPass : ""
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(['One or more fields have been left blank']);
                });
        });
    });
    describe('Register with the passwords not matching', function(){
        it('Register with the passwords not matching should return a 400', function () {
            mockgoose.reset();
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "fake@gmail.com",
                    password : "beep",
                    confirmPass : "boop"
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(["Passwords don't match"]);
                });
        });
    });
    describe('Register with already existing conflicting users', function () {
        before(function() {
            mockgoose.reset();
            user = new User({username:'secret', email:'fake@gmail.com'});
            user.save(function(err, user){
                if (err) return console.error(err);
            });
        });
        it('Conflicting user names should result in a 400', function(){
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "fake2@gmail.com",
                    password : "password",
                    confirmPass : "password"
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(["This Username already exists"]);
                });
        });
        it('Conflicting emails should result in a 400', function(){
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret2",
                    email : "fake@gmail.com",
                    password : "password",
                    confirmPass : "password"
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(["This email is already in use"]);
                });
        });
        it('Conflicting emails and usernames should result in a 400', function(){
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "fake@gmail.com",
                    password : "password",
                    confirmPass : "password"
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(["This Username already exists", "This email is already in use"]);
                });
        });
        it('All errors emails should result in a 400', function(){
            chai.request(app)
                .post('/api/register')
                .send({
                    username: "secret",
                    email : "fake@gmail.com",
                    password : "password",
                    confirmPass : ""
                })
                .end(function (err, res) {
                    chai.expect(res).to.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage');
                    res.body.errorMessage.should.be.a('array');
                    chai.expect(res.body.errorMessage).to.eql(["One or more fields have been left blank", "Passwords don't match" , "This Username already exists","This email is already in use"]);
                });
        });
    });
    /*
    describe('Qurery a user', function () {
        before(function() {
            user = new User({email:'secret', username:'errr'});
            user.save(function(err, user){
                if (err) return console.error(err);
            });
        });
        it('should not fail', function () {
            User.findOne({email : 'secret'}, function (err, e) {
                if(!e){
                    assert(false);
                }
            });
        });
    });

});

describe('Friends', function () {

});
*/