var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    // empty fields
    if (req.body.username === "" ||
        req.body.password === "" ||
        req.body.confirmPass === "") {
        res.status(400).json({
            "message" : "InvalidRequestError: Empty Fields"
        });
    } else if (req.body.password !== req.body.confirmPass) { // passwords don't match
        res.status(400).json({
            "message" : "InvalidRequestError: Passwords Don't Match"
        });
    } else {
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
            } else {
                res.status(400).json(info);
            }
        })(req, res);
    }
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