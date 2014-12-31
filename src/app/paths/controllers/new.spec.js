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


    xdescribe("add new path", function(){
      var addNewPath;

      beforeEach(function(){
        addNewPath = index.props.curation[3].onClick;
        addNewPath();
      });

      it("can create new paths", function(){
        expect(setAppStateSpy).called;
      });
    });
  });
})();
