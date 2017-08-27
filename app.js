const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routers/index');


var app = express();
app.use(bodyParser.json());

var distDir = __dirname + '/dist';
app.use(express.static(distDir));

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

// done! we export it so we can start the site in start.js
module.exports = app;