var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var apiRouter = require('./router/router');
var passport = require('passport');
var auth = require('./auth/auth');
var User = require('./database/db').user;
app.use(express.static(__dirname + '/../client'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/api', apiRouter);
app.use(passport.session());

app.get('/', function(req, res) {
  fs.sendFile(__dirname + '/../client/index.html');
});

app.post('/signin', passport.authenticate('local', {}), function(req, res) {
	var userID = req.session.passport.user;
	res.send({userID: userID});
});

app.post('/signup', function(req, res) {
	User.findAll({where: {username: req.body.username}})
			.then(function (user) {
				if (user.length > 0) {
					return;
				} else {
					return auth.hashPwAsync(req.body.password)
						.then(function (hashed) {
							return User.create({
								username: req.body.username,
								password: hashed,
								isAdmin: req.body.isAdmin
							});
						})
						.then(function (user) {
							res.send({
								userID: user.dataValues.id,
								admin: user.dataValues.isAdmin
							});
						})
				}
			})
});

module.exports = app;