var Sequelize = require('sequelize');
var userInfo = require('./setting.js');
var sequelize = new Sequelize('expense_tracking', userInfo.username, userInfo.password, {
	host: userInfo.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});



// Define User table
var User = sequelize.define('User', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING,
	isAdmin: Sequelize.BOOLEAN
});
// Define Expense table
var Expense = sequelize.define('Expense', {
	dateTime: Sequelize.DATE,
	amount: Sequelize.FLOAT,
	description: Sequelize.TEXT('long')
});

Expense.hasMany(User, {foreignKey: 'expense_id'});
User.sync();
Expense.sync();

module.exports = {
	user: User,
	expense: Expense
}