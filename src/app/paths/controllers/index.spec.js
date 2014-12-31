(function(){

  describe("Index", function(){
    var index;
    var $scope;

    var getCoverInfoSpy;
    var getAppStateSpy;
    var setAppStateSpy;
    var dispatcherObserverSpy;

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
      };

      Path = {
      }

      var dispatcher = {
        setState: function(){ return; },
        getState: function(){ return { user: ''} },
        registerObserverCallback: function(){ return; }
      }

      getCoverInfoSpy = sinon.spy(CoverInfo, 'get');
      getAppStateSpy = sinon.spy(dispatcher, 'getState');
      setAppStateSpy = sinon.spy(dispatcher, 'setState');
      dispatcherObserverSpy = sinon.spy(dispatcher, 'registerObserverCallback');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        index = $controller('Index', {
          CoverInfo: CoverInfo,
          Path: Path,
          dispatcher: dispatcher,
          coverInfo: {},
          paths: []
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

      it("does not calls cover info to get the data", function(){
        expect(getCoverInfoSpy).not.to.have.been.called;
      });
    });

    describe("add new path", function(){
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
