(function(){

  describe("Sidebar", function(){
    var sidebar;
    var $scope;
    var appStateMock;
    var setCurrentUserSpy;

    beforeEach(function () {
      module('unacademic.sidebar.controller');

      var appState = {
        get: function(){},
        set: function(){},
        registerObserverCallback: function(){}
      };

      var currentUser = {
        setId: function(){}
      };

      appStateMock= sinon.mock(appState);

      var state = {
        user: undefined,
        mode: 'browsing'
      }

      appStateMock.expects('get').once().returns(state);

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        sidebar = $controller('Sidebar', {
          $scope: $scope,
          appState: appState,
          currentUser: currentUser
        });
      });
    });

    describe("initial state",function(){

      it("registers the observers", function(){
        appStateMock.expects('registerObserverCallback').once();
      });

      it("calls appState to get the currentUser and mode", function(){
      });

      it("sets the results", function(){
        expect(sidebar.user).to.be.undefined;
        expect(sidebar.mode).to.equal('browsing')
      });
    });


    describe("signIn", function(){
      it("sets the current user id on mode", function(){
        sidebar.signIn();
        appStateMock.expects('set').once();
      });
    });


    describe("changeMode", function(){

      describe("if mode is learning", function(){
        beforeEach(function(){
          sidebar.mode = 'learning';
          sidebar.changeMode();
        });

        it("attempts to set the mode on mode", function(){
          appStateMock.expects('set').once();
        });
      });

      describe("if mode is curation", function(){
        beforeEach(function(){
          sidebar.mode = 'curation';
          sidebar.changeMode();
        });

        it("attempts to set the mode on mode", function(){
          appStateMock.expects('set').once();
        });
      });
    });
  });
})();
