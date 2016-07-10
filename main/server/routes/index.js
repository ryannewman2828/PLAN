var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SECRET', //TODO: Remove this from the code
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

router.get('/profile', auth, ctrlProfile.profileRead);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('../../../client/index.html');
});

module.exports = router;
