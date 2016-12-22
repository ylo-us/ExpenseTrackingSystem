var apiRouter = require('express').Router();
var User = require('./../database/db').user;
var Expense = require('./../database/db').expense;
// Create route handlers for each request

apiRouter.route('/expense')
.get(
	function(req, res) {
		var id = req.url.split('=')[1];
		User.find({where: {id: req.url.split('=')[1]}})
				.then(function(user) {
					if (user.dataValues.isAdmin) {
						Expense.findAll()
									 .then(function(expense) {
									 	res.send(expense);
									 })
					} else {
						Expense.findAll({where: {user_id: id}})
									 .then(function(expense) {
									 	res.send(expense);
									 })
					}
				})
	}
)
.post(
	function(req, res) {
		var id = req.body.userID;
		Expense.create({
			dateTime: req.body.timeStamp,
			amount: req.body.amount,
			description: req.body.description,
			user_id: id
		}).then(function() {
			User.find({where: {id: id}})
				.then(function(user) {
					if (user.dataValues.isAdmin) {
						Expense.findAll()
									 .then(function(expense) {
									 	res.send(expense);
									 })
					} else {
						Expense.findAll({where: {user_id: id}})
									 .then(function(expense) {
									 	res.send(expense);
									 })
					}
				})
		})
	}
)
.put(
	function(req, res) {
		Expense.update({
			dateTime: req.body.timeStamp,
			amount: req.body.amount,
			description: req.body.description
		}, {where: {id: req.body.id}})
		.then(function(result) {
			res.send(result);
		})
	}
)
.delete(
	function(req, res) {
		var id = req.url.split('=')[1];
		Expense.destroy({where: {id: id}})
					 .then(function(expense) {
					 	res.send('data was successfully deleted');
					 })
	}
);

apiRouter.route('/report')
.get(
	function(req, res) {
		var id = req.url.split('=')[1];
		Expense.findAll({
			group: [sequelize.fn('date_trunc', 'day', sequelize.col('dataTime'))]
			}).then(function(expense) {
					 	res.send(expense);
					 })
	}
);

module.exports = apiRouter;

