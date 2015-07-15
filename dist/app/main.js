(function(){
  'use strict';

  angular.module('Main', [
    'ngRoute',
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    }).
    otherwise({ redirectTo: '/' });
  }]).
  controller('HomeController', ['$scope', '$rootScope', HomeController]);

  function HomeController($scope) {}
})();
