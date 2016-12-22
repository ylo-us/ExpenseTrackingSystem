angular.module('expense', [])
.controller('ExpenseController', function($scope, $http) {
	var url = 'http://localhost:8000/api/expense';
	$scope.transaction = {};
	$scope.expense = [];
	$scope.createTransaction = function() {
		var time = new Date();
		$http({
			method: 'POST',
			url: url,
			data: {
				timeStamp: time,
				amount: $scope.transaction.amount,
				description: $scope.transaction.description,
				userID: window.currentUser
			}
		}).then(function success(res) {
			$scope.expense.length = 0;
			res.data.forEach(function(element) {
				$scope.expense.push(element);
			})
		}, function error(res) {
			alert('Error happened!!');
		})
	}
	// send the updates to server
	$scope.editTransaction = function(e, transac) {
		if (transac.user_id === window.currentUser) {
			var time = new Date();
			$http({
				method: 'PUT',
				url: url,
				data: {
					timeStamp: time,
					amount: $scope.expense[e].amount,
					description: $scope.expense[e].description,
					id: $scope.expense[e].id
				}
			})
		} else {
			alert('Sorry... You can only edit your own transactions.');
		}
	}

	$scope.readTransaction = function() {
		$scope.expense.length = 0;
		$http({
			method: 'GET',
			url: url + '?id=' + window.currentUser,
		}).then(function success(res) {
			res.data.forEach(function(element) {
				$scope.expense.push(element);
			})
		}, function error(res) {
			alert('Error happened!!');
		})
	}

	$scope.deleteTransaction = function(e, transac) {
		if (transac.user_id === window.currentUser) {
			$http({
				method: 'DELETE',
				url: url + '?id=' + $scope.expense[e].id,
			}).then(function success(res) {
				$scope.expense.splice(e, 1);
			}, function error(res) {
				alert('Error happened!!');
			}) 
		} else {
			alert('Sorry... You can only edit your own transactions.');
		}
	}
	// updates the dom element with user's input
	$scope.editText = function($event, transac, data) {
		if (transac.user_id === window.currentUser) {
			var updates = prompt('Please type updates: ');
			if (data === 'amount') {
				if (!isNaN(parseFloat(updates))) {
					transac[data] = parseFloat(updates);
				} else {
					alert('Please enter a valid number');
				}
			} else {
				transac[data] = updates;
			}
		} else {
			alert('Sorry... You can only edit your own transactions.');
		}
	}
})