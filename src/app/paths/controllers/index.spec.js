(function(){

  describe("Index", function(){
    var index;
    var coverInfo;
    var appState;
    var $q;
    var $scope;

    var getInfoSpy;
    var saveInfoSpy;
    var changeRouteSpy;

    beforeEach(function () {
      module('unacademic.paths.controllers.index');

      coverInfo = {
        get: function(){ return {}; },
        save: function(){
          return $q.when('hi');
        }
      };

      getInfoSpy = sinon.spy(coverInfo, 'get');
      saveInfoSpy = sinon.spy(coverInfo, 'save');

      appState = {
        go: function(){ return; }
      }

      changeRouteSpy = sinon.spy(appState, 'go');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        index = $controller('Index', {
          paths: [],
          coverInfo: coverInfo,
          appState: appState
        });
      });
    });

    describe("general", function(){
      it("calls cover info to get the data", function(){
        expect(getInfoSpy).to.have.been.called;
      });

      it("sets the display properties", function(){
        expect(index.info.displayProperties).not.to.be.undefined;
      });

      it("sets the exportable actions", function(){
        expect(index.actions).not.to.be.undefined;
      });
    });

    describe("save", function(){

      beforeEach(function(){
        index.actions["Save"]().then(function(){});
        $scope.$apply();
      })

      it("delegates to coverInfo", function(){
        expect(saveInfoSpy).to.have.been.called;
      });

    });

    describe("addNewPath", function(){

      beforeEach(function(){
        index.actions["Add New Path"]().then(function(){});
        $scope.$apply();
      })

      it("calls save on coverInfo", function(){
        expect(saveInfoSpy).to.have.been.called;
      });

      it("delegates to appState to change the route", function(){
        expect(changeRouteSpy).to.have.been.calledWith('paths.new')
      });
    });

  });
})();
