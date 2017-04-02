var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
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
                    "message": "InvalidResponseError: User Already Exists"
                });
            } else {
                var newUser = new User();

                newUser.local.username = username;
                newUser.setPassword(password);
                newUser.online = true;
                newUser.friends = [];

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
        User.findOne({ 'local.username': username }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    "message": "InvalidResponseError: User doesn't exists"
                });
            }

            if (!user.verifyPassword(password)) {
                return done(null, false, {
                    "message": "InvalidResponseError: Password isn't correct"
                });
            }

            return done(null, user);
        });
    })
);

passport.use('facebook', new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            } else {
                var newUser            = new User();

                newUser.facebook.id    = profile.id;
                newUser.facebook.token = token;
                newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                // newUser.facebook.email = profile.emails[0].value; // for when app is live

                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }

                    return done(null, newUser);
                });
            }

        });

    })
);