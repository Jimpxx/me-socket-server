const express = require('express');
// const mongo = require('mongodb').MongoClient;
// const MongoClient = require('mongodb').MongoClient;
const MongoDB = require('./db/mongodb');

// const dsn = process.env.DSN || 'mongodb://localhost:27017';

const app = express();

const port = 8300;

const server = app.listen(port, function() {
    console.log(`server running on port ${port}`);
    // console.log(`DSN is: ${dsn}`);
});

const io = require('socket.io')(server);

MongoDB.connectToServer(async function(err, client) {
    if (err) throw err;

    var db = MongoDB.getDb();

    // Uncomment when deploying
    io.origins(['https://jimmyandersson.me:443']);

    io.on('connection', function(socket) {
        console.log(socket.id);
        socket.broadcast.emit('user-connected', { message: '' });
        socket.on('disconnect', function(data) {
            console.log('user disconnected');
            socket.broadcast.emit('user-disconnected', { message: '' });
        });

        socket.on('SAVE_CHAT', data => {
            db.collection('texts').insertMany(data, (err, r) => {
                if (err) throw err;
            });
        });

        socket.on('LOAD_CHAT', data => {
            db.collection('texts')
                .find()
                .toArray((err, res) => {
                    // if (err) throw err;
                    console.log(res);
                    io.emit('LOAD_RESPONSE', res);
                });
        });

        socket.on('SEND_MESSAGE', function(data) {
            io.emit('MESSAGE', data);
        });
    });
});
