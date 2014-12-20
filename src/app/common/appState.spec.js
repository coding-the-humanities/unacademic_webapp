(function(){

  describe("appState", function(){
    var appState;
    var $log;

    var getCurrentUserSpy;
    var getModeSpy;

    var setCurrentUserSpy;
    var setModeSpy;

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

      getCurrentUserSpy = sinon.spy(currentUser, 'getId');
      getModeSpy = sinon.spy(mode, 'get');

      setCurrentUserSpy = sinon.spy(currentUser, 'setId');
      setModeSpy = sinon.spy(mode, 'set');

      permissionMock = sinon.mock(permission);

      module('unacademic.common.appState',  function($provide){
        $provide.value('permission', permission);
        $provide.value('mode', mode);
        $provide.value('currentUser', currentUser);
      });

      inject(function(_appState_, _$log_){
        appState = _appState_;
        $log = _$log_;
      });
    });

    describe("get", function(){

      beforeEach(function(){
        appState.get();
      });

      it("calls currentUser.getId", function(){
        expect(getCurrentUserSpy).calledOnce;
      });

      it("calls currentUser.getId", function(){
        expect(getModeSpy).calledOnce;
      });
    });

    describe("set", function(){
      var notificationSpy;

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
      });

      describe("with no previous state", function(){

        var setState;

        describe("users and mode", function(){

          beforeEach(function(){

            var state = {
              mode: undefined,
              nextMode: 'learning',
              user: 'yeehaa'
            }

            permissionMock.expects('get').withArgs(state).once().returns(true);
            setState = appState.set({user: 'yeehaa', nextMode: 'learning'});
          });

          it("returns true", function(){
            expect(setState).to.be.true;
          });

          it("does set the value", function(){
            expect(setCurrentUserSpy).calledWith('yeehaa');
            expect(setModeSpy).calledWith('learning');
          });

          it("notifies observers", function(){
            expect(notificationSpy).calledOnce;
          });
        });

        describe("with a id", function(){

          beforeEach(function(){
            var state = {
              mode: undefined,
              nextMode: undefined,
              user: 'yeehaa'
            }

            permissionMock.expects('get').withArgs(state).once().returns(true);
            setState = appState.set({user: 'yeehaa'});
          });

          it("returns true", function(){
            expect(setState).to.be.true;
          });

          it("sets the value", function(){
            expect(setCurrentUserSpy).calledWith('yeehaa');
          });

          it("notifies observers", function(){
            expect(notificationSpy).calledOnce;
          });
        });

        describe("users", function(){

          describe("without an id", function(){

            beforeEach(function(){

              var state = {
                mode: undefined,
                nextMode: undefined,
                user: undefined
              }

              permissionMock.expects('get').withArgs(state).once().returns(true);
              setState = appState.set({user: ''});
            });

            it("returns false", function(){
              expect(setState).to.be.false;
            });

            it("does not set the value", function(){
              expect(setCurrentUserSpy).not.called;
            });

            it("does not notify observers", function(){
              expect(notificationSpy).not.called;
            });
          });

          describe("with a id", function(){

            beforeEach(function(){
              var state = {
                mode: undefined,
                nextMode: undefined,
                user: 'yeehaa'
              }

              permissionMock.expects('get').withArgs(state).once().returns(true);
              setState = appState.set({user: 'yeehaa'});
            });

            it("returns true", function(){
              expect(setState).to.be.true;
            });

            it("notifies observers", function(){
              expect(notificationSpy).calledOnce;
            });
          });
        });

        describe("mode", function(){

          describe("without a mode", function(){

            beforeEach(function(){
              var state = {
                mode: undefined,
                nextMode: '',
                user: undefined
              }

              permissionMock.expects('get').withArgs(state).once().returns(true);
              setState = appState.set({nextMode: ''});
            });

            it("returns false", function(){
              expect(setState).to.be.false;
            });

            it("does not set the value", function(){
              expect(setModeSpy).not.called;
            });

            it("does not notify observers", function(){
              expect(notificationSpy).not.called;
            });
          });

          describe("with a mode", function(){

            beforeEach(function(){
              var state = {
                mode: undefined,
                nextMode: 'learning',
                user: undefined
              }

              permissionMock.expects('get').withArgs(state).once().returns(true);
              setState = appState.set({nextMode: 'learning'});
            });

            it("returns true", function(){
              expect(setState).to.be.true;
            });

            it("sets the value", function(){
              expect(setModeSpy).calledWith('learning');
            });

            it("notifies observers", function(){
              expect(notificationSpy).calledOnce;
            });
          });
        });
      });
    });
  });
})();
