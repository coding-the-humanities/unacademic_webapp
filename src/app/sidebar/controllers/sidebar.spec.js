(function(){

  describe("Sidebar", function(){
    var sidebar;
    var $scope;
    var setUserSpy;

    beforeEach(function () {
      module('unacademic.sidebar.controller');

      var appState = {
        setCurrentUserId: function(){ return 'yeehaa' },
        getCurrentUserId: function(){},
        getMode: function(){ return 'learning' },
        setMode: function(){},
        registerObserverCallback: function(){}
      };

      getUserSpy = sinon.spy(appState, 'getCurrentUserId');
      setUserSpy = sinon.spy(appState, 'setCurrentUserId');
      getModeSpy = sinon.spy(appState, 'getMode');
      setModeSpy = sinon.spy(appState, 'setMode');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        sidebar = $controller('Sidebar', {
          $scope: $scope,
          appState: appState
        });
      });
    });

    describe("initial state",function(){

      describe('user', function(){
        it("calls appState to set the current user", function(){
          expect(getUserSpy).to.be.called;
        });

        it("has no current user", function(){
          expect(sidebar.user).to.be.undefined;
        });
      });

      describe('mode', function(){
        it("calls appState to set the current mode", function(){
          expect(getModeSpy).to.be.called;
        });

        it("is set to learning", function(){
          expect(sidebar.mode).to.equal('learning');
        });
      });
    });

    describe("signIn", function(){

      beforeEach(function(){
        sidebar.signIn();
      });

      it("knows the name of the current user", function(){
        expect(setUserSpy).to.be.called;
      });
    });

    describe("mode switching", function(){
    });
  });
})();
