(function(){

  describe("appState", function(){
    var appState;
    var $log;

    var getCurrentUserSpy;
    var getModeSpy;

    var setCurrentUserSpy;
    var setModeSpy;

    var getPathSpy;

    var permissionMock;

    beforeEach(function(){

      var mode = {
        get: function(){},
        set: function(){}
      };

      var currentUser = {
        setId: function(){},
        getId: function(){}
      };

      var permission = {
        get: function(){}
      };

      $state = {
        current: {
          name: '123'
        },
        go: function(){}
      };

      getCurrentUserSpy = sinon.spy(currentUser, 'getId');
      setCurrentUserSpy = sinon.spy(currentUser, 'setId');

      getModeSpy = sinon.spy(mode, 'get');
      setModeSpy = sinon.spy(mode, 'set');

      setNameSpy = sinon.spy($state, 'go')

      permissionMock = sinon.mock(permission);

      module('unacademic.common.appState',  function($provide){
        $provide.value('permission', permission);
        $provide.value('mode', mode);
        $provide.value('currentUser', currentUser);
        $provide.value('$state', $state);
      });

      inject(function(_appState_, _$log_){
        appState = _appState_;
        $log = _$log_;
      });
    });

    describe("get", function(){
      var state;

      beforeEach(function(){
        state = appState.get();
      });

      it("gets the current user", function(){
        expect(getCurrentUserSpy).calledOnce;
      });

      it("gets the current mode", function(){
        expect(getModeSpy).calledOnce;
      });

      it("gets the current path url", function(){
        expect(state.name).to.equal('123');
      });
    });

    describe("set", function(){
      var notificationSpy;
      var getAppStateSpy;

      beforeEach(function(){
        notificationSpy = sinon.spy();
        appState.registerObserverCallback(notificationSpy);
      });

      describe("with no changes", function(){

        beforeEach(function(){
          var state = {};
          permissionMock.expects('get').once().returns(state);
          setState = appState.set({user: 'yeehaa'});
        });

        it("returns false", function(){
          expect(setState).to.be.false;
        });

        it("does not notify observers", function(){
          expect(notificationSpy).not.called;
        });

        it("does not set any value", function(){
          expect(setCurrentUserSpy).not.called;
          expect(setModeSpy).not.called;
          expect(setModeSpy).not.called;
        });

        it("does not log state", function(){
          expect($log.log.logs.length).to.equal(0);
        });
      });


      describe("with one change", function(){
        var state;

        beforeEach(function(){
          state = {
            mode: 'learning',
          }

          permissionMock.expects('get').once().returns(state);
          setState = appState.set(state);
        });

        it("returns true", function(){
          expect(setState).to.be.true;
        });

        it("sets the values", function(){
          expect(setCurrentUserSpy).not.called;
          expect(setNameSpy).not.called;
          expect(setModeSpy).calledWith('learning');
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });

        it("logs the state", function(){
          expect($log.log.logs.length).to.equal(1);
        });
      });

      describe("with multiple changes", function(){
        var state;

        beforeEach(function(){
          state = {
            mode: 'learning',
            name: '123',
            user: 'yeehaa'
          }

          permissionMock.expects('get').once().returns(state);
          setState = appState.set(state);
        });

        it("returns true", function(){
          expect(setState).to.be.true;
        });

        it("sets the values", function(){
          expect(setCurrentUserSpy).calledWith('yeehaa');
          expect(setModeSpy).calledWith('learning');
          expect(setNameSpy).calledWith('123');
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });

        it("logs the state", function(){
          expect($log.log.logs.length).to.equal(1);
        });
      });
    });
  });
})();
