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

      describe("state switching", function(){

        describe("to browsing", function(){
          beforeEach(function(){
            dispatcher.getState = sinon.stub().returns({mode: 'browsing'});
            dispatcher.registerObserverCallback.callArg(0);
            $scope.$digest();
          });

          it("sets the mode to curation", function(){
            expect(sidebar.mode).to.equal('browsing');
          });

          it("sets curation to true", function(){
            expect(sidebar.curation).to.be.false;
          });
        });

        describe("to learning", function(){
          beforeEach(function(){
            dispatcher.getState = sinon.stub().returns({mode: 'learning'});
            dispatcher.registerObserverCallback.callArg(0);
            $scope.$digest();
          });

          it("sets the mode to curation", function(){
            expect(sidebar.mode).to.equal('learning');
          });

          it("sets curation to true", function(){
            expect(sidebar.curation).to.be.false;
          });
        });

        describe("to curation", function(){
          beforeEach(function(){
            dispatcher.getState = sinon.stub().returns({mode: 'curation'});
            dispatcher.registerObserverCallback.callArg(0);
            $scope.$digest();
          });

          it("sets the mode to curation", function(){
            expect(sidebar.mode).to.equal('curation');
          });

          it("sets curation to true", function(){
            expect(sidebar.curation).to.be.true;
          });
        });
      });
    });
  });
})();
