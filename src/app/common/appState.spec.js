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

      describe("with no permission", function(){

        beforeEach(function(){
          permissionMock.expects('get').once().returns(false);
          setState = appState.set({user: 'yeehaa'});
        });

        it("returns false", function(){
          expect(setState).to.be.false;
        });
      });

      describe("with no previous state", function(){

        var setState;

        describe("users and mode", function(){

          beforeEach(function(){

            var state = {
              mode: 'learning',
              user: 'yeehaa'
            }

            permissionMock.expects('get').withArgs(state).once().returns(true);
            setState = appState.set({user: 'yeehaa', newMode: 'learning'});
          });

          it("returns true", function(){
            expect(setState).to.be.true;
          });

          it("does set the value", function(){
            expect(setCurrentUserSpy).calledWith('yeehaa');
            expect(setModeSpy).calledWith('learning');
          });
        });

        describe("with a id", function(){

          beforeEach(function(){
            var state = {
              mode: undefined,
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
        });

        describe("users", function(){
          describe("without an id", function(){

            beforeEach(function(){

              var state = {
                mode: undefined,
                user: ''
              }

              permissionMock.expects('get').withArgs(state).once().returns(true);
              setState = appState.set({user: ''});
            });

            it("returns true", function(){
              expect(setState).to.be.false;
            });

            it("does not set the value", function(){
              expect(setCurrentUserSpy).not.called;
            });
          });

          describe("with a id", function(){

            beforeEach(function(){
              var state = {
                mode: undefined,
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
          });
        });

        describe("mode", function(){

          describe("without a mode", function(){

            beforeEach(function(){
              var state = {
                mode: '',
                user: undefined
              }

              permissionMock.expects('get').withArgs(state).once().returns(true);
              setState = appState.set({newMode: ''});
            });

            it("returns true", function(){
              expect(setState).to.be.false;
            });

            it("does not set the value", function(){
              expect(setModeSpy).not.called;
            });
          });

          describe("with a mode", function(){

            beforeEach(function(){
              var state = {
                mode: 'learning',
                user: undefined
              }

              permissionMock.expects('get').withArgs(state).once().returns(true);
              setState = appState.set({newMode: 'learning'});
            });

            it("returns true", function(){
              expect(setState).to.be.true;
            });

            it("sets the value", function(){
              expect(setModeSpy).calledWith('learning');
            });
          });
        });
      });
    });
  });
})();
