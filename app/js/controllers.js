angular.module('countriesCapitalsApp')
//main controller for the app
.controller('mainCtrl', ['$scope', 'countryData', function($scope, countryData){}])
//controller for the countries list view
.controller('countriesCtrl', ['$scope', '$location', '$filter', 'countryData', '$q', function($scope, $location, $filter, countryData, $q) {
  'use strict';

  //turn objects into strings and store in variable
  var toString = Object.prototype.toString;

  //Did API call return any data?
  $q.when(countryData.countries).then(function(result){
    //If we did get data back, is it an object?
    if(toString.call(countryData.countries)=='[object Object]') {
      countryData.countries = result.geonames;
    }
    $scope.countries = countryData.countries;
  });
  //when user clicks on a country's row in the list, open details box
  $scope.showDetail = function(country) {
    $location.path('/countries/'+country.countryCode);
  };
  //take the string objects for area and population and turn them into a floating point number
  angular.forEach($scope.countries, function (country) {
    country.areaInSqKm = parseFloat(country.areaInSqKm);
    country.population = parseFloat(country.population);
  });
}])
//controller for the detailed country view
.controller('detailsCtrl', ['$scope','$route','countryData',function($scope, $route, countryData) {

  countryData.getCountry($route.current.params.countryCode).then(function(result){
    $scope.country=result[0];
    console.log($scope.country);
  });

  countryData.getCapitals($route.current.params.countryCode).then(function(result){
    $scope.capital = result;
    $scope.capitalPopulation = $scope.capital.population;
  });

  countryData.getNeighbors($route.current.params.countryCode).then(function(result){
    $scope.neighbors = result.geonames;
  });

  $scope.flag = $route.current.params.countryCode.toLowerCase();
  $scope.map = $route.current.params.countryCode;

}]);