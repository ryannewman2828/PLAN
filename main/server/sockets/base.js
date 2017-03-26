var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log("A user connected");
        socket.on('user_login', function (id) {
            User.findById(id).exec(function (err, user) {
                console.log('emmitting socket');
                socket.broadcast.emit('update_list', user.local.username);
            })
        });
        socket.emit('echo', 'Hello World!');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
    });
};
