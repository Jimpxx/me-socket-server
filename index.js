const express = require('express');

const app = express();

const port = 8300;

const server = app.listen(port, function() {
    console.log(`server running on port ${port}`);
});

const io = require('socket.io')(server);

io.origins(['https://jimmyandersson.me:443']);

io.on('connection', function(socket) {
    console.log(socket.id);
    socket.broadcast.emit('user-connected', { message: '' });
    socket.on('disconnect', function(data) {
        console.log('user disconnected');
        socket.broadcast.emit('user-disconnected', { message: '' });
    });

    // socket.on('response', function(data) {
    //     console.log(data);
    // });

    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data);
    });
});
