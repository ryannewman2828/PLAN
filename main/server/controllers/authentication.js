var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    /* Error checking here */
    var error = false;
    var errorMessage = [];

    // empty fields
    if (req.body.username === "" ||
        req.body.password === "" ||
        req.body.confirmPass === "") {
        error = true;
        errorMessage.push("One or more fields have been left blank");
    }

    // passwords don't match
    if (req.body.password !== req.body.confirmPass) {
        error = true;
        errorMessage.push("Passwords don't match");
    }

    // non-unique username
    User
        .findOne({username: req.body.username})
        .exec(function (err, existingUser) {
            if (existingUser) {
                error = true;
                errorMessage.push("This Username already exists");
            }
        })
        .then(function () {
            /* Error checking finished */
            if (!error) {
                passport.authenticate('local-signup', function (err, user, info) {
                    var token;

                    // If Passport throws/catches an error
                    if (err) {
                        console.log('error');
                        res.status(404).json(err);
                        return;
                    }

                    // If a user is found
                    if(user){
                        token = user.generateJwt();
                        res.status(200);
                        res.json({
                            "token" : token
                        });
                    }
                })(req, res);
            } else {
                res.status(400).json({
                    "errorMessage" : errorMessage
                });
            }
        });
};

module.exports.login = function(req, res) {
    passport.authenticate('local-login', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};