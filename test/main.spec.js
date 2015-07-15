'use strict';

describe('Controller: HomeController', function() {
    var rootScope, scope, controller, httpBackend;

    beforeEach(module('Main'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        controller = $controller('HomeController', { '$scope': scope });
        rootScope = $rootScope;
        scope.$digest();
    }));

    it('should work', function() {
      expect(scope).toBeDefined();
      expect(Object.keys(scope).length).toBeGreaterThan(0);
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
});
