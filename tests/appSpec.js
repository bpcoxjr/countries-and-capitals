//this test checks to make sure html templates load as expected

describe('Routes', function(){
	beforeEach(module('countriesCapitalsApp'));

	//when route is '/home', does home partial load properly?
	it('should load home partial', function(){
		inject(function($route, $rootScope, $location, $httpBackend){
			var route = $route.routes['/home'];
			$httpBackend.whenGET(route.templateUrl).respond('...');

			$rootScope.$apply(function(){
				$location.path(route.originalPath);
			});

			expect($route.current.templateUrl).toBe('./partials/home.html');
		});
	});

	//when route is '/countries', does countries partial load properly?
	it('should load countries partial', function(){
		inject(function($route, $rootScope, $location, $httpBackend){
			var route = $route.routes['/countries'];
			$httpBackend.whenGET(route.templateUrl).respond('...');

			$rootScope.$apply(function(){
				$location.path(route.originalPath);
			});

			expect($route.current.templateUrl).toBe('./partials/countries.html');
		});
	});
});