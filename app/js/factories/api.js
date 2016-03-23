//Factory of API calls to geonames//
angular.module('DataServices', [])

.factory('dataFactory',['$http', '$route', '$q', function($http, $route, $q){

  //registered username w/ geonames.org
  var username = "bpcoxjr";
  
  var baseURL = "http://api.geonames.org/";

  return {
    //declare getCountries function to get list of ALL countries &
    //pass required params into $http call
    getCountries: function(){
      var defer = $q.defer();
      var url = baseURL + "countryInfoJSON";
      var request = {
        callback: 'JSON_CALLBACK',
        username: username
      };

      $http({
        method: 'JSONP',
        url: url,
        params: request,
        cache: true
      })
      //if our function call is successful...
      .success(function(data, status, headers, config) {
        if(typeof data.status == 'object') {
          console.log("Error'" + data.status.message + ".");
          defer.reject(data.status);
        } else {
          defer.resolve(data);
        }
      })
      //if our function call fails...
      .error(function(data, status, headers, config) {
        console.log(status + " error occurred.");
        defer.reject();
      });
      return defer.promise;
    },
    //function to make request for info on a country
    getCountry: function(countryCode) {
      var defer = $q.defer();
      var url = baseURL + "countryInfoJSON";
      var request = {
        callback: 'JSON_CALLBACK',
        country: countryCode,
        username: username
      };

      $http({
        method: 'JSONP',
        url: url,
        params: request,
        cache: true
      })
      //if our function call is successful...
      .success(function(data, status, headers, config) {
        defer.resolve(data.geonames);
      })
      //if our function call fails...
      .error(function(data, status, headers, config) {
        console.log(status + " error occured.");
        defer.reject();
      });

      return defer.promise;
    },
    //function to make request for neighboring countries
    getNeighbors: function(countryCode){
      var defer = $q.defer();
      var url = baseURL + "neighboursJSON";
      var request = {
        callback: 'JSON_CALLBACK',
        country: countryCode,
        username: username
      };

      $http({
        method: 'JSONP',
        url: url,
        params: request,
        cache: true
      })
      //if function call is successful...
      .success(function(data, status, headers, config) {
        defer.resolve(data);
      })
      //if function call fails...
      .error(function(data, status, headers, config) {
        console.log(status + " error occured.");
        defer.reject();
      });

      return defer.promise;
    },
    //function to make request for capitals
    getCapitals: function(countryCode) {
      var defer = $q.defer();
      var url = baseURL + "searchJSON";
      var request = {
        callback: 'JSON_CALLBACK',
        q: "capital",
        formatted: true,
        country: countryCode,
        maxRows: 1,
        username: username
      };

      $http({
        method: 'JSONP',
        url: url,
        params: request,
        cache: true
      })
      //if our funciton call is succesful...
      .success(function(data, status, headers, config){
        defer.resolve(data.geonames[0]);
      })
      //if our function call fails...
      .error(function(data, status, headers, config){
        console.log(status + " error occured.");
        defer.reject();
      });

      return defer.promise;
    }
  };
}]);