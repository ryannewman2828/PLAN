var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    var user = new User();

    /* Error checking here */
    var error = false;
    if(req.body.name === "" ||
    req.body.username === "" ||
    req.body.email === "" ||
    req.body.password === "" ||
    req.body.confirmPass === ""){
        error = true;
        res.status(400);
        res.json({
            "errorMessage" : "One or more fields have been left blank"
        })
    }


    if(!error) {
        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.credits = 0;

        user.setPassword(req.body.password);

        user.save(function (err) {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        });
    }
};

module.exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info){
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