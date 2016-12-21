var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var apiRouter = require('./router/router');
app.use(express.static(__dirname + '/../client'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.get('/', function(req, res) {
  fs.sendFile(__dirname + '/../client/index.html');
});

app.get('/signin', function(req, res) {

});

app.post('/signup', function(req, res) {

});

module.exports = app;