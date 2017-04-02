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
var ctrlFriend = require('../controllers/friend');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/profile/online', auth, ctrlProfile.onlineUsers);

// friends
router.get('/friends', auth, ctrlFriend.viewFriends);
router.get('/friends/online', auth, ctrlFriend.viewOnlineFriends);
router.get('/friends/request/:id', auth, ctrlFriend.sendFriendRequest);
router.get('/friends/accept/:id', auth, ctrlFriend.acceptFriendRequest);
router.get('/friends/decline/:id', auth, ctrlFriend.declineFriendRequest);
router.get('/friends/requests/get', auth, ctrlFriend.friendRequests);
router.get('/friends/requests/sent', auth, ctrlFriend.sentRequests);

module.exports = router;
