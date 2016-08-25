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
var ctrlCharacters = require('../controllers/characters');
var ctrlCollection = require('../controllers/collection');
var ctrlMissions = require('../controllers/missions');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profile/:id', ctrlProfile.viewProfile);
router.post('/message/:id', ctrlMsg.sendMessage);
router.post('/delete-message/:id', ctrlMsg.deleteMessage);
router.get('/missions/:id', ctrlMissions.getMissions);
router.post('/settings/password', ctrlProfile.changePassword);
router.post('/settings/email', ctrlProfile.changeEmail);
router.post('/settings/profilePic', ctrlProfile.changeProfilePic);

// friends
router.post('/friend/:id', ctrlFriend.addFriend);
router.post('/accept-friend/:id', ctrlFriend.acceptFriend);
router.post('/reject-friend/:id', ctrlFriend.rejectFriend);
router.post('/delete-friend/:id', ctrlFriend.deleteFriend);

// collection
router.get('/characters', ctrlCharacters.getCharacters);
router.get('/collection/:id', ctrlCollection.getCollection);

module.exports = router;
