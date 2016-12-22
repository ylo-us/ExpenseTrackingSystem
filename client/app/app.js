angular.module('myApp', ['ngRoute', 'auth', 'expense', 'report'])
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'app/auth/signin.html',
		controller: 'AuthController'
	})
	.when('/signin', {
		templateUrl: 'app/auth/signin.html',
		controller: 'AuthController'
	})
	.when('/signup', {
		templateUrl: 'app/auth/signup.html',
		controller: 'AuthController'
	})
	.when('/expense', {
		templateUrl: 'app/expense/expense.html',
		controller: 'ExpenseController'
	})
	.when('/report', {
		templateUrl: 'app/report/report.html',
		controller: 'ReportController'
	})
})
