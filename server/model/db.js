var mongoose = require('mongoose');
var dbURI = 'mongodb://username:password@ds015335.mlab.com:15335/userbase';

mongoose.connect(dbURI);

// Initializes all schemas and models
require('./users');