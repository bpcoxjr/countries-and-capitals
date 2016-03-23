//declare Angular module & its dependencies
angular.module('countriesCapitalsApp', ['DataServices', 'Data', 'ngRoute', 'ngAnimate'])
//use routing to show appropriate html partial & use correct controller for each view
.config(['$locationProvider','$routeProvider',
  function($locationProvider, $routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "./partials/home.html",
        controller: "mainCtrl",
      })
      .when("/countries", {
        templateUrl: "./partials/countries.html",
        controller: "countriesCtrl",
      })
      .when("/countries/:countryCode", {
        templateUrl: "./partials/details.html",
        controller: "detailsCtrl",
      })
      .otherwise({
        redirectTo: '/home'
      });
  }
]);