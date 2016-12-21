var axios = require('axios');

angular.module('auth', [])
.controller('AuthController', function($scope, $location) {
	$scope.user = {};
	$scope.signin = function() {
		axios.get('/signin')
				 .then(function(res) {

				 })
	}
})