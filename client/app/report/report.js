angular.module('report', [])
.controller('ReportController', function($scope, $http, $filter) {
	$scope.week = {
    value: new Date
  };
  $scope.date = {
  	start: new Date,
  	end: new Date
  }
  $scope.weeklyExpense = 0;

	$scope.expense = [];
	$scope.updateExpense = [];
	var url = 'http://localhost:8000/api/expense';
	
	$scope.calWeekly = function() {
		$scope.weeklyExpense = 0;
		for (var i = 0; i < $scope.expense.length; i++) {
			var weekOfTarget = $filter('date')($scope.expense[i].dateTime, 'w');
			var weekOfCurrent = $filter('date')($scope.week.value, 'w');
			if (weekOfCurrent === weekOfTarget) {
				$scope.weeklyExpense += parseFloat($scope.expense[i].amount);
			}
		}
	}

	$scope.updateReport = function() {
		$scope.updateExpense.length = [];
		for (var i = 0; i < $scope.expense.length; i++) {
			var currentDate = new Date($scope.expense[i].dateTime);
			if (currentDate >= $scope.date.start 
				&& currentDate <= $scope.date.end) {
				$scope.updateExpense.push($scope.expense[i]);
			}
		}
	}

	var getExpense = function() {
		$scope.expense.length = 0;
		$http({
			method: 'GET',
			url: url + '?id=' + window.currentUser,
		}).then(function success(res) {
			res.data.forEach(function(element) {
				$scope.expense.push(element);
				$scope.updateExpense.push(element);
			})

		}, function error(res) {
			alert('Error happened!!');
		})
	}
	getExpense();
})
