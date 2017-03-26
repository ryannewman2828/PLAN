var express = require('express');
var passport = require('passport');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SECRET', //TODO: Remove this from the code
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profile/online', auth, ctrlProfile.onlineUsers);

module.exports = router;
