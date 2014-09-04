var app = angular.module('conferencesApp', []);

app.controller('confController', function($scope,$http) {
	$scope.orderByField = 'firstName';
  	$scope.reverseSort = false;
	
	$http.get('../conferences.json').success(function(data) {
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		data.forEach(function(el) {
			var zone = el.zone.toLowerCase();
			var when_begin = "start" in el ? el.start : "";
			if(when_begin.length > 0) {
				var when = when_begin.substring(when_begin.indexOf('-')+1,when_begin.indexOf('-')+6);
				el.month_start = months[parseInt(when.substring(0,2))-1];
				el.day_start = when.substring(3);
			}
			var when_end = "stop" in el ? el.stop : "";
			if(when_end.length > 0) {
				var when = when_end.substring(when_end.indexOf('-')+1,when_end.indexOf('-')+6);
				el.month_end = months[parseInt(when.substring(0,2))-1];
				el.day_end = when.substring(3);
			}
			switch(zone) {
				case "australasia":
					el.flags = 'flag au';
					break;

				case "europe":
					el.flags = 'flag _European_Union';
					break;

				case "north america":
					el.flags = 'flag us';
					break;

				case "south america":
					el.flags = 'flag sa';
					break;
			}
		});
		$scope.conferences = data;
	});	
});