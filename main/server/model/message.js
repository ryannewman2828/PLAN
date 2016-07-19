var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    receiver: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);