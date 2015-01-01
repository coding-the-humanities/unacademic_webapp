(function(){

  describe("New", function(){
    var newCourse;
    var $scope;

    var getCoverInfoSpy;
    var getAppStateSpy;
    var setAppStateSpy;
    var dispatcherObserverSpy;

    beforeEach(function () {
      module('unacademic.courses.controllers.new');

      var courseInfo = {
        course: {
          displayProperties: ['summary']
        }
      };

      var Course = {
        get: function(){
          return $q.when(course);
        },
      };

      var dispatcher = {
        setState: function(){ return; },
        getState: function(){ return { user: ''} },
        registerObserverCallback: function(){ return; }
      }

      getCourseSpy = sinon.spy(Course, 'get');
      getAppStateSpy = sinon.spy(dispatcher, 'getState');
      setAppStateSpy = sinon.spy(dispatcher, 'setState');
      dispatcherObserverSpy = sinon.spy(dispatcher, 'registerObserverCallback');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        newCourse = $controller('New', {
          Course: Course,
          dispatcher: dispatcher,
          course: {}
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

      it("does not calls course to get the data", function(){
        expect(getCourseSpy).not.to.have.been.called;
      });
    });


    describe("add new objective", function(){
      var addNewObjective;

      beforeEach(function(){
        addNewObjective = newCourse.props.curation[3].onClick;
        addNewObjective();
      });

      xit("can create new objectives", function(){
        expect(setAppStateSpy).called;
      });
    });
  });
})();
