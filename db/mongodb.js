const MongoClient = require('mongodb').MongoClient;
// const url = process.env.DBURL || 'mongodb://localhost:27017';
const url = process.env.DBURL || 'mongodb://127.0.0.1:27017';

var _db;

module.exports = {
    connectToServer: function(callback) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(
            err,
            client,
        ) {
            _db = client.db('chat');
            return callback(err);
        });
    },

    getDb: function() {
        return _db;
    },
};

// const MongoClient = require('mongodb').MongoClient;
// const uri = 'mongodb://localhost:27017/chat';
// let _db;

// const connectDB = async callback => {
//     try {
//         MongoClient.connect(uri, (err, db) => {
//             _db = db;
//             return callback(err);
//         });
//     } catch (e) {
//         throw e;
//     }
// };

// const getDB = () => _db;

// const disconnectDB = () => _db.close();

// module.exports = { connectDB, getDB, disconnectDB };
