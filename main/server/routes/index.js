var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SECRET', //TODO: Remove this from the code
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlMsg = require('../controllers/messages');
var ctrlFriend = require('../controllers/friends');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profile/:id', ctrlProfile.viewProfile);
router.post('/message/:id', ctrlMsg.sendMessage);
router.post('/friend/:id', ctrlFriend.addFriend);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
