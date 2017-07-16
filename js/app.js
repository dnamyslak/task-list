var jiffApp = angular.module('jiffApp', [
	'ngRoute',
	'tasks',
    'dndLists',
    'ui.bootstrap',
    'LocalStorageModule'
]); 

jiffApp.config(['$locationProvider' ,'$routeProvider', 'localStorageServiceProvider',
    function config($locationProvider, $routeProvider, localStorageServiceProvider) {
      // $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/tasks', {
          template: '<tasks></tasks>'
        })
        .otherwise('/tasks');

        localStorageServiceProvider
        .setPrefix('myApp')
        .setStorageType('sessionStorage')
        .setNotify(true, true)
    }
]);
