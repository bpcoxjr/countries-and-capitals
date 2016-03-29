describe('geonames', function(){
	beforeEach(module('countriesCapitalsApp'));

	inject(function(_$rootScope_, _$injector_, $templateCache){
		$rootScope = _$rootScope_;
		$injector = _$injector_;
		$templateCache.put('./partials/home.html', '<.partials/home.html/>');
	});

	it('(the getCountries function) should query the geonames api for countries data',
    inject(function(dataFactory, $httpBackend, $rootScope, $q) {
      $httpBackend.expect('JSONP', 'http://api.geonames.org/countryInfoJSON?callback=JSON_CALLBACK&username=bpcoxjr')
        .respond({
          geonames: [{key:0}, {key:1}]
        });

      var countries

      $q.when(dataFactory.getCountries()).then(function(result){
        countries = result.geonames
      });

      $rootScope.$digest();
      $httpBackend.flush();
      expect(countries.length).toBe(2);
      $httpBackend.verifyNoOutstandingRequest();
  }));
});
