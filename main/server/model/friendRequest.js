var mongoose = require('mongoose');

var friendRequestSchema = new mongoose.Schema({
    requesterID: {
        type: String,
        required: true
    },
    recipientID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
