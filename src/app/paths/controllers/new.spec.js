(function(){

  describe("New", function(){
    var newPath;
    var $scope;

    var getCoverInfoSpy;
    var getAppStateSpy;
    var setAppStateSpy;
    var dispatcherObserverSpy;

    beforeEach(function () {
      module('unacademic.paths.controllers.new');

      var pathInfo = {
        path: {
          displayProperties: ['summary']
        }
      };

      var Path = {
        get: function(){
          return $q.when(path);
        },
      };

      var dispatcher = {
        setState: function(){ return; },
        getState: function(){ return { user: ''} },
        registerObserverCallback: function(){ return; }
      }

      getPathSpy = sinon.spy(Path, 'get');
      getAppStateSpy = sinon.spy(dispatcher, 'getState');
      setAppStateSpy = sinon.spy(dispatcher, 'setState');
      dispatcherObserverSpy = sinon.spy(dispatcher, 'registerObserverCallback');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        newPath = $controller('New', {
          Path: Path,
          dispatcher: dispatcher,
          path: {}
        });
      });
    });

    describe("general", function(){

      it("registers the dispatcher observer callback", function(){
        expect(dispatcherObserverSpy).to.have.been.calledOnce;
      });

      it("does not call dispatcher to get the user id", function(){
        expect(getAppStateSpy).not.to.have.been.called;
      });

      it("does not calls path to get the data", function(){
        expect(getPathSpy).not.to.have.been.called;
      });
    });


    describe("add new objective", function(){
      var addNewObjective;

      beforeEach(function(){
        addNewObjective = newPath.props.curation[3].onClick;
        addNewObjective();
      });

      xit("can create new objectives", function(){
        expect(setAppStateSpy).called;
      });
    });
  });
})();
