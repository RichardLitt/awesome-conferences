var app = angular.module('conferencesApp', [ ]);

app.controller('confController', function($scope,$http) {
	$http.get('../conferences.json').success(function(data) {
		$scope.conferences = data;
	});
});