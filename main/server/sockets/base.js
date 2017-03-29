var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (io) {
    var sessions = {};
    io.on('connection', function (socket) {
        console.log('connection');
        socket.on("socket-register", function (id) {
            console.log('registering');
            if (id) {
                if (sessions.hasOwnProperty(id)) {
                    User.update({_id : id}, {online : true}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    connected = true;
                } else {
                    User.update({_id : id}, {online : true}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    User.findById(id).exec(function (err, user) {
                        socket.broadcast.emit('update_list', user.local.username);
                    });
                    console.log('new user connected');
                    sessions[id] = true;
                }
                socket.uid = id;
            }
        });
        //User.findById(socket.uid).exec(function (err, user) {
        //    console.log('emitting socket');
        //    socket.broadcast.emit('update_list', user.local.username);
        //});
        socket.on('disconnect', function() {
            User.update({_id : socket.uid}, {online : false}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            setTimeout(function () {
                var connected = false;
                var username = "";
                User.findById(socket.uid).exec(function (err, user) {
                    if (err){
                        console.log(err)
                    } else if (user){
                        connected = user.online;
                        username = user.local.username;
                    }
                }).then(function () {
                    if (!connected) {
                        delete sessions[socket.uid];
                        socket.broadcast.emit('remove_list', username);
                        console.log('user disconnected');
                    }
                });
            }, 10000);
        });
    });
};
