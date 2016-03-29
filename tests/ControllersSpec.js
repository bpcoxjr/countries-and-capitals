describe('countriesCtrl', function(){
	var controller = null;
	$scope = null;

	beforeEach(function(){
		module('countriesCapitalsApp');
	});

	beforeEach(inject(function($controller, $rootScope){
		$scope = $rootScope.$new();
		controller = $controller('countriesCtrl', {
			$scope: $scope
		});
	}));

	it('should have an initial value equal to country name', function(){
		expect($scope.predicate).toEqual('countryName');
	});
});