(function(){

  describe("dispatcher", function(){
    var dispatcher;
    var $log;

    var getCurrentUserSpy;
    var setCurrentUserSpy;

    var getModeSpy;
    var setModeSpy;

    var getLockStateSpy;
    var setLockStateSpy;

    var getPathSpy;

    var permissionMock;

    beforeEach(function(){

      var mode = {
        get: function(){},
        set: function(){}
      };

      var lock = {
        getState: function(){},
        setState: function(){}
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

      getLockStateSpy = sinon.spy(lock, 'getState');
      setLockStateSpy = sinon.spy(lock, 'setState');

      setNameSpy = sinon.spy($state, 'go')

      permissionMock = sinon.mock(permission);

      module('unacademic.common.dispatcher',  function($provide){
        $provide.value('permission', permission);
        $provide.value('mode', mode);
        $provide.value('lock', lock);
        $provide.value('currentUser', currentUser);
        $provide.value('$state', $state);
      });

      inject(function(_dispatcher_, _$log_){
        dispatcher = _dispatcher_;
        $log = _$log_;
      });
    });

    afterEach(function(){
      permissionMock.verify();
    });

    describe("get", function(){
      var state;

      beforeEach(function(){
        state = dispatcher.getState();
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

      it("current state of the locked", function(){
        expect(getLockStateSpy).calledOnce;
      });
    });

    describe("set", function(){
      var notificationSpy;
      var getAppStateSpy;

      beforeEach(function(){
        notificationSpy = sinon.spy();
        dispatcher.registerObserverCallback(notificationSpy);
      });

      describe("with no changes", function(){

        beforeEach(function(){
          var state = {};
          permissionMock.expects('get').once().returns(state);
          setState = dispatcher.setState({user: 'yeehaa'});
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
          expect(setLockStateSpy).not.called;
        });

        it("does not log state", function(){
          expect($log.log.logs.length).to.equal(0);
        });
      });


      describe("with one change", function(){

        beforeEach(function(){
          var approvedState = {
            mode: 'learning',
          }

          var proposedState = {
            lock: undefined,
            mode: 'learning',
            name: '123',
            user: undefined
          }

          permissionMock.expects('get')
            .withArgs(proposedState)
            .once()
            .returns(approvedState);
          setState = dispatcher.setState(approvedState);
        });

        it("returns true", function(){
          expect(setState).to.be.true;
        });

        it("sets the values", function(){
          expect(setCurrentUserSpy).not.called;
          expect(setNameSpy).not.called;
          expect(setModeSpy).calledWith('learning');
          expect(setLockStateSpy).not.called;
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });

        it("logs the state", function(){
          expect($log.log.logs.length).to.equal(1);
        });
      });

      describe("with multiple changes", function(){

        beforeEach(function(){
          var approvedState = {
            mode: 'learning',
            name: '123',
            user: 'yeehaa',
            lock: 'locked' 
          }

          var proposedState = {
            lock: 'locked',
            mode: 'learning',
            name: '123',
            user: 'yeehaa'
          }

          permissionMock.expects('get')
            .withArgs(proposedState)
            .once()
            .returns(approvedState);
          setState = dispatcher.setState(approvedState);
        });

        it("returns true", function(){
          expect(setState).to.be.true;
        });

        it("sets the values", function(){
          expect(setCurrentUserSpy).calledWith('yeehaa');
          expect(setModeSpy).calledWith('learning');
          expect(setNameSpy).calledWith('123');
          expect(setLockStateSpy).calledWith('locked');
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
