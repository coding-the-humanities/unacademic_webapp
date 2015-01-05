(function(){

  describe("resource", function(){
    var resource;

    beforeEach(function(){

      module('unacademic.appState.resource');

      $stateParams = {
        courseId: '123'
      }

      module('unacademic.appState.resource',  function($provide){
        $provide.value('$stateParams', $stateParams);
      });

      inject(function(_resource_, _$rootScope_){
        resource = _resource_;
        $rootScope = _$rootScope_;
      });
    });

    describe("resource name", function(){

      it("calls $state to get its initial state name", function(){
        expect(resource.get()).to.equal('123');
      });

      it("is set to its internal value on subsequent calls", function(){
        resource.get();
        $stateParams.courseId = '456';
        $rootScope.$apply();
        expect(resource.get()).to.equal('123');
      });

      describe("set", function(){
        var name;
        var setName;

        beforeEach(function(){
          name = '123';
          setName = resource.set(name);
        });


        it("returns true", function(){
          expect(setName).to.be.true;
        });

        it("can be set", function(){
          expect(resource.get()).to.equal(name);
        });
      })
    })
  });
})();
