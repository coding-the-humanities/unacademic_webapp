(function(){

  describe("Sidebar", function(){
    var sidebar;
    var $scope;
    var dispatcher;
    var navHelpers;

    beforeEach(function () {
      module('unacademic.sidebar.controller');

      dispatcher = {};
      dispatcher.getState = sinon.stub().returns({mode: 'browsing'});
      dispatcher.setState = sinon.stub();

      dispatcher.registerObserverCallback = sinon.stub();

      navHelpers = {};
      navHelpers.goBack = sinon.spy();
      navHelpers.goForward = sinon.spy();

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        sidebar = $controller('Sidebar', {
          $scope: $scope,
          navHelpers: navHelpers,
          dispatcher: dispatcher
        });
      });
    });

    describe("initialize",function(){
      it("sets the results", function(){
        $scope.$digest();
        expect(dispatcher.registerObserverCallback).called;
        expect(dispatcher.getState).called;
        expect(sidebar.user).to.be.undefined;
        expect(sidebar.mode).to.equal('browsing')
      });
    });

    describe("time travel", function(){

      it("calls navhelpers.back", function(){
        sidebar.back();
        expect(navHelpers.goBack).to.be.called;
      });

      it("calls navhelpers.forward", function(){
        sidebar.forward();
        expect(navHelpers.goForward).to.be.called;
      });
    });

    describe("mode switching", function(){
      describe("when the returned mode matches the new one", function(){
        beforeEach(function(){
          sidebar.mode = 'learning';
          dispatcher.getState = sinon.stub().returns({mode: 'learning'});
          dispatcher.registerObserverCallback.callArg(0);
          $scope.$digest();
        });

        it("keep the mode to learning", function(){
          expect(sidebar.mode).to.equal('learning');
        });
      });

      describe("when the returned mode does not match", function(){
        beforeEach(function(){
          dispatcher.getState = sinon.stub().returns({mode: 'learning'});
          dispatcher.registerObserverCallback.callArg(0);
          sidebar.mode = 'browsing';
          $scope.$digest();
        });

        it("requests to set the current state", function(){
          expect(dispatcher.setState).calledWith({mode: 'browsing'});
        })

        it("keep the mode to learning", function(){
          expect(sidebar.mode).to.equal('learning');
        });
      });
    });
  });
})();
