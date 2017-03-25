module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log("A user connected");
        socket.on('message', function (from, msg) {
            console.log('recieved message from', from, 'msg', JSON.stringify(msg));
            console.log('broadcasting message');
            console.log('payload is', msg);
            io.sockets.emit('broadcast', {
                payload: msg,
                source: from
            });
        });
        socket.emit('echo', 'Hello World!');
    });
};
