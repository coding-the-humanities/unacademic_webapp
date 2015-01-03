(function(){

  describe("Sidebar", function(){
    var sidebar;
    var $scope;
    var dispatcherMock;

    beforeEach(function () {
      module('unacademic.sidebar.controller');

      var dispatcher = {
        getState: function(){},
        setState: function(){},
        queue: function(){},
        registerObserverCallback: function(){}
      };

      dispatcherMock= sinon.mock(dispatcher);

      var state = {
        user: undefined,
        mode: 'browsing'
      }

      dispatcherMock.expects('getState').once().returns(state);
      dispatcherMock.expects('registerObserverCallback').once();

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        sidebar = $controller('Sidebar', {
          $scope: $scope,
          dispatcher: dispatcher
        });
      });
    });

    afterEach(function(){
      dispatcherMock.verify();
    });

    describe("initial state",function(){
      it("sets the results", function(){
        expect(sidebar.user).to.be.undefined;
        expect(sidebar.mode).to.equal('browsing')
      });
    });

    describe("signIn", function(){
      it("sets the current user id on mode", function(){
      dispatcherMock.expects('setState').once();
        sidebar.signIn();
      });
    });

    describe("changeMode", function(){

      afterEach(function(){
        sidebar.changeMode();
      });

      describe("if mode is learning", function(){
        it("attempts to set the mode to curation", function(){
          sidebar.mode = 'learning';
          dispatcherMock.expects('setState')
            .withArgs({mode: 'curation'})
            .once();
        });
      });

      describe("if mode is curation", function(){
        it("attempts to set the mode to curation", function(){
          sidebar.mode = 'curation';
          dispatcherMock.expects('setState')
            .withArgs({mode: 'learning'})
            .once();
        });
      });
    });
  });
})();
