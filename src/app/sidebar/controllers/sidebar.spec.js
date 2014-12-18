(function(){

  describe("Sidebar", function(){
    var sidebar;
    var $scope;
    var setUserSpy;

    beforeEach(function () {
      module('unacademic.sidebar.controller');

      var mode = {
        get: function(){ return 'learning' },
        set: function(){},
        registerObserverCallback: function(){}
      };

      var currentUser = {
        setId: function(){ return 'yeehaa' },
        getId: function(){},
        registerObserverCallback: function(){}
      }

      getUserSpy = sinon.spy(currentUser, 'getId');
      setUserSpy = sinon.spy(currentUser, 'setId');
      getModeSpy = sinon.spy(mode, 'get');
      setModeSpy = sinon.spy(mode, 'set');

      inject(function ($rootScope, $controller, _$q_) {
        $scope = $rootScope.$new();
        $q = _$q_;
        sidebar = $controller('Sidebar', {
          $scope: $scope,
          mode: mode,
          currentUser: currentUser
        });
      });
    });

    describe("initial state",function(){

      describe('user', function(){

        it("calls mode to set the current user", function(){
          expect(getUserSpy).to.be.calledOnce;
        });

        it("has no current user", function(){
          expect(sidebar.user).to.be.undefined;
        });
      });

      describe('mode', function(){

        it("calls mode to set the current mode", function(){
          expect(getModeSpy).to.be.calledOnce;
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

      it("sets the current user id on mode", function(){
        expect(setUserSpy).to.be.calledOnce;
      });
    });

    describe("mode switching", function(){
    });

    describe("changeMode", function(){

      describe("if mode is learning", function(){
        beforeEach(function(){
          sidebar.mode = 'learning';
          sidebar.changeMode();
        });

        it("attempts to set the mode on mode", function(){
          expect(setModeSpy).to.be.calledOnce;
          expect(setModeSpy).to.be.calledWith('curation');
        });
      });

      describe("if mode is curation", function(){
        beforeEach(function(){
          sidebar.mode = 'curation';
          sidebar.changeMode();
        });

        it("attempts to set the mode on mode", function(){
          expect(setModeSpy).to.be.calledOnce;
          expect(setModeSpy).to.be.calledWith('learning');
        });
      });
    });
  });
})();
