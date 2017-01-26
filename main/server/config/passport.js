var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load the auth variables
var configAuth = require('./auth');


passport.use('local-signup', new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, {
                    message: 'User already exists'
                });
            } else {
                var newUser = new User();

                newUser.local.username = username;
                newUser.setPassword(password);

                // save the user
                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, newUser);
                });
            }
        });
    }
));

passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
        console.log(username)
        User.findOne({ 'local.username': username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: "User doesn't exists"
                });
            }

            if (!user.verifyPassword(password)) {
                return done(null, false, {
                    message: "Password isn't correct"
                });
            }

            return done(null, user);
        });
    }));
