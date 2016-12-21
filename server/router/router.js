var apiRouter = require('express').Router();
var User = require('./../database/db').user;
var Expense = require('./../database/db').expense;
// Create route handlers for each request

apiRouter.route('/expense')
.get(
	function(req, res) {
		res.send('routing test success');
	}
)
.put(
	function(req, res) {
		
	}
)
.delete(
	function(req, res) {
		
	}
);

apiRouter.route('/signup')
.post(
	function(req, res) {

	}
)

module.exports = apiRouter;

