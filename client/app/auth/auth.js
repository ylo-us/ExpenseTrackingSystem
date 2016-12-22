angular.module('auth', [])
.controller('AuthController', function($scope, $location, $http) {
	$scope.user = {isAdmin: false};
	$scope.signin = function() {
		$http({
			method: 'POST',
			url: 'http://localhost:8000/signin',
			data: {
				username: $scope.user.username,
				password: $scope.user.password
			}
		}).then(function success(res) {
			window.currentUser = res.data.userID;
			window.admin = res.data.admin;
			$location.path('/expense');
		}, function error(res) {
			alert('Error happened. Please check your username and password');
		})
	}

	$scope.signup = function() {
		$http({
			method: 'POST',
			url: 'http://localhost:8000/signup',
			data: {
				username: $scope.user.username,
				password: $scope.user.password,
				isAdmin: $scope.user.isAdmin
			}
		}).then(function success(res) {
			window.currentUser = res.data.userID;
			window.admin = res.data.admin;
			$location.path('/expense');
		}, function error(res) {
			alert('Error happened. Please check your username and password');
		})
	}
})
