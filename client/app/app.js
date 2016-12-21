angular.module('myApp', ['ngRoute', 'auth', 'expense', 'report'])
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'auth/signin.html',
		controller: 'AuthController'
	})
	.when('/signin', {
		templateUrl: 'auth/signin.html',
		controller: 'AuthController'
	})
	.when('/signup', {
		templateUrl: 'auth/signup.html',
		controller: 'AuthController'
	})
	.when('/expense', {
		templateUrl: 'expense/expense.html',
		controller: 'ExpenseController'
	})
	.when('report', {
		templateUrl: 'report/report.html',
		controller: 'ReportController'
	})
})
