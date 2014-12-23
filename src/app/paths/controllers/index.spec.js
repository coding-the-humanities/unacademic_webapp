(function(){

  describe("Index", function(){
    var index;
    var $scope;

    var getInfoSpy;
    var saveInfoSpy;
    var setAppStateSpy;
    var getAppStateSpy;
    var appStateObserverSpy;

    beforeEach(function () {
      module('unacademic.paths.controllers.index');

      var coverInfo = {
        info: {
          displayProperties: ['summary']
        }
      };

      var CoverInfo = {
        get: function(){
          return $q.when(coverInfo);
        },
        save: function(){
          return $q.when();
        }
      };

      var appState = {
        set: function(){ return; },
        get: function(){ return { user: ''} },
        registerObserverCallback: function(){ return; }
      }

      getInfoSpy = sinon.spy(CoverInfo, 'get');
      saveInfoSpy = sinon.spy(CoverInfo, 'save');
      setAppStateSpy = sinon.spy(appState, 'set');
      getAppStateSpy = sinon.spy(appState, 'get');
      appStateObserverSpy = sinon.spy(appState, 'registerObserverCallback');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        index = $controller('Index', {
          CoverInfo: CoverInfo,
          appState: appState
        });
      });
    });

    describe("general", function(){

      beforeEach(function(){
        $scope.$apply();
      });

      it("registers the appState observer callback", function(){
        expect(appStateObserverSpy).to.have.been.calledOnce;
      });

      it("calls appState  to get the user id", function(){
        expect(getAppStateSpy).not.to.have.been.called;
      });

      it("calls cover info to get the data", function(){
        expect(getInfoSpy).to.have.been.calledOnce;
        expect(getInfoSpy).to.have.been.calledWith('general');
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
        expect(setAppStateSpy).to.have.been.calledWith({name: 'paths.new'});
      });
    });
  });
})();
