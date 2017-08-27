const mongodb = require('mongodb');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

var USER_COLLECTION = 'users';
var GAMES_COLLECTION = 'games';
var ROUNDS_COLLECTION = 'rounds';
var MOVES_COLLECTION = 'moves';


var db;

mongodb.MongoClient.connect(process.env.DATABASE, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    db = database;
    userCollection = db.collection(USER_COLLECTION);
    gameCollection = db.collection(GAMES_COLLECTION);
    roundCollection = db.collection(ROUNDS_COLLECTION);
    moveCollection = db.collection(MOVES_COLLECTION);

    console.log('Connect successfull');

});

const app = require('./app');
var server = app.listen(process.env.PORT || 8889, function () {
    var port = server.address().port;
    console.log('App running on port', port);
});