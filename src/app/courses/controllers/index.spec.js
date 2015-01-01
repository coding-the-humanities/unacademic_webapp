(function(){

  describe("Index", function(){
    var index;
    var $scope;

    var getCoverInfoSpy;
    var getAppStateSpy;
    var setAppStateSpy;
    var dispatcherObserverSpy;

    beforeEach(function () {
      module('unacademic.courses.controllers.index');

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

      Course = function(){
        return {
          id: '123'
        }
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
          Course: Course,
          dispatcher: dispatcher,
          coverInfo: {},
          courses: []
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

    describe("move to an existing course", function(){
      var addNewCourse;

      beforeEach(function(){
        index.goTo({id: '123'});
      });

      it("can create new courses", function(){
        expect(setAppStateSpy).calledWith({name: 'courses.details', params: '123'});
      });
    });

    describe("add new course", function(){
      var addNewCourse;

      beforeEach(function(){
        addNewCourse = index.props.curation[3].onClick;
        addNewCourse();
      });

      it("can create new courses", function(){
        expect(setAppStateSpy).calledWith({mode: 'curation', name: 'courses.details', params: '123'});
      });
    });
  });
})();
