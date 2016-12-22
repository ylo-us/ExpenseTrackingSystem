angular.module('report', [])
.controller('ReportController', function($scope, $http) {
	$scope.week = {
    value: new Date()
  };
  $scope.date = {
  	start: new Date(),
  	end: new Date()
  }
  console.log('date: ', $scope.date);

	$scope.expense = [];
	var url = 'http://localhost:8000/api/expense';
	$scope.getExpense = function() {
		$scope.expense.length = 0;
		console.log('currentUser: ', window.currentUser);
		$http({
			method: 'GET',
			url: url + '?id=' + window.currentUser,
		}).then(function success(res) {
			console.log($scope.week.value);
			console.log('success res: ', res);
			res.data.forEach(function(element) {
				$scope.expense.push(element);
			})
		}, function error(res) {
			alert('Error happened!!');
		})
	}
})
