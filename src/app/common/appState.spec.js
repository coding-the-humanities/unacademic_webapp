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
        }
      };

      getCurrentUserSpy = sinon.spy(currentUser, 'getId');
      setCurrentUserSpy = sinon.spy(currentUser, 'setId');

      getModeSpy = sinon.spy(mode, 'get');
      setModeSpy = sinon.spy(mode, 'set');

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

      describe("with no permission", function(){

        beforeEach(function(){
          permissionMock.expects('get').once().returns(false);
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
        });

        it("does not log state", function(){
          expect($log.log.logs.length).to.equal(0);
        });
      });


      describe("users and mode", function(){
        var state;

        beforeEach(function(){

          state = {
            mode: 'learning',
            name: '123',
            user: 'yeehaa'
          };

          permissionMock.expects('get').once().returns(true);
          setState = appState.set(state);
        });

        it("returns true", function(){
          expect(setState).to.be.true;
        });

        it("sets the values", function(){
          expect(setCurrentUserSpy).calledWith('yeehaa');
          expect(setModeSpy).calledWith('learning');
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });

        it("logs the state", function(){
          expect($log.log.logs.length).to.equal(1);
          expect($log.log.logs[0][0]).to.eql(state);
        });
      });

      describe("users", function(){

        describe("without an id", function(){

          beforeEach(function(){
            permissionMock.expects('get').once().returns(true);
            setState = appState.set({user: ''});
          });

          it("returns false", function(){
            expect(setState).to.be.false;
          });

          it("does not set any value", function(){
            expect(setCurrentUserSpy).not.called;
            expect(setModeSpy).not.called;
          });

          it("does not notify observers", function(){
            expect(notificationSpy).not.called;
          });

          it("does not log state", function(){
            expect($log.log.logs.length).to.equal(0);
          });
        });

        describe("with a id", function(){

          beforeEach(function(){
            permissionMock.expects('get').once().returns(true);
            setState = appState.set({user: 'yeehaa'});
          });

          it("returns true", function(){
            expect(setState).to.be.true;
          });

          it("only sets the user value", function(){
            expect(setCurrentUserSpy).calledWith('yeehaa');
            expect(setModeSpy).not.called;
          });

          it("notifies observers", function(){
            expect(notificationSpy).calledOnce;
          });

          it("logs the state", function(){

            var state = {
              mode: undefined,
              name: '123',
              user: 'yeehaa'
            }

            expect($log.log.logs.length).to.equal(1);
            expect($log.log.logs[0][0]).to.eql(state);
          });
        });
      });

      describe("mode", function(){

        describe("without a mode", function(){

          beforeEach(function(){
            permissionMock.expects('get').once().returns(true);
            setState = appState.set({mode: ''});
          });

          it("returns false", function(){
            expect(setState).to.be.false;
          });

          it("does not set any value", function(){
            expect(setCurrentUserSpy).not.called;
            expect(setModeSpy).not.called;
          });

          it("does not notify observers", function(){
            expect(notificationSpy).not.called;
          });

          it("does not log state", function(){
            expect($log.log.logs.length).to.equal(0);
          });
        });

        describe("with a mode", function(){

          beforeEach(function(){
            permissionMock.expects('get').once().returns(true);
            setState = appState.set({mode: 'learning'});
          });

          it("returns true", function(){
            expect(setState).to.be.true;
          });

          it("only sets the mode value", function(){
            expect(setCurrentUserSpy).not.called;
            expect(setModeSpy).calledWith('learning');
          });

          it("notifies observers", function(){
            expect(notificationSpy).calledOnce;
          });

          it("logs the state", function(){

            var state = {
              mode: 'learning',
              name: '123',
              user: undefined
            }

            expect($log.log.logs.length).to.equal(1);
            expect($log.log.logs[0][0]).to.eql(state);
          });
        });
      });
    });
  });
})();
