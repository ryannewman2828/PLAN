var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    var user = new User();

    /* Error checking here */
    var error = false;
    var errorMessage = [];

    // empty fields
    if(req.body.username === "" ||
    req.body.email === "" ||
    req.body.password === "" ||
    req.body.confirmPass === ""){
        error = true;
        errorMessage.push("One or more fields have been left blank");
    }

    // passwords don't match
    if(req.body.password !== req.body.confirmPass){
        error = true;
        errorMessage.push("Passwords don't match");
    }

    // non-unique username
    User.findOne({username : req.body.username}, function (err, existingUser) {
        if(existingUser){
            error = true;
            errorMessage.push("This Username already exists");
        }

        // non-unique email
        User.findOne({email : req.body.email}, function (err, existingEmail) {
            if(existingEmail){
                error = true;
                errorMessage.push("This email is already in use");
            }
            onFinish();
        });
    });



    /* Error checking finished */

    var onFinish = function(){
        if(!error) {
            user.username = req.body.username;
            user.email = req.body.email;
            user.characters = "";
            user.missions = "";
            user.profilePic = "Brand";

            user.setPassword(req.body.password);

            user.save(function (err) {
                var token;
                token = user.generateJwt();
                res.status(200);
                res.json({
                    "token": token
                });
            });
        } else {
            res.status(400);
            res.json({
                "errorMessage" : errorMessage
            });
        }
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