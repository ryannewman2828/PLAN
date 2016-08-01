var mongoose = require('mongoose');
var dbURI;

if(process.env.mode === 'PRODUCTION') {
    dbURI = 'mongodb://username:password@ds015335.mlab.com:15335/userbase';
} else if (process.env.mode === 'TESTING'){
    dbURI = 'mongodb://username:password@ds139655.mlab.com:39655/test-user-base';
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// Initializes all schemas and models
require('./users');