(function(){

  describe("dispatcher", function(){
    var dispatcher;
    var $log;

    var getCurrentUserSpy;
    var setCurrentUserSpy;

    var getModeSpy;
    var setModeSpy;

    var getQueueStub;
    var setQueueStub;

    var getPathSpy;

    var permissionMock;

    beforeEach(function(){

      var mode = {
        get: function(){},
        set: function(){}
      };

      var queue = {
        get: function(){},
        set: function(){}
      }

      var currentUser = {
        setId: function(){},
        getId: function(){}
      };

      var permission = {
        get: function(){}
      };

      $state = {
        current: {
          name: undefined
        },
        go: function(){}
      };

      $stateParams = {
        courseId: '123'
      }

      getCurrentUserSpy = sinon.spy(currentUser, 'getId');
      setCurrentUserSpy = sinon.spy(currentUser, 'setId');

      getModeSpy = sinon.spy(mode, 'get');
      setModeSpy = sinon.spy(mode, 'set');

      getQueueStub = sinon.stub(queue, 'get').returns([]);
      setQueueStub = sinon.stub(queue, 'set').returns('123');

      setNameSpy = sinon.spy($state, 'go')

      permissionMock = sinon.mock(permission);

      module('unacademic.common.dispatcher',  function($provide){
        $provide.value('permission', permission);
        $provide.value('mode', mode);
        $provide.value('queue', queue);
        $provide.value('currentUser', currentUser);
        $provide.value('$state', $state);
        $provide.value('$stateParams', $stateParams);
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

      it("gets the current state name", function(){
        expect(state.name).to.equal(undefined);
      });

      it("gets the current state params", function(){
        expect(state.resource).to.equal('123');
      });

      it("current state of the queue", function(){
        expect(getQueueStub).calledOnce;
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
          expect(setNameSpy).not.called;
          expect(setModeSpy).not.called;
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
            mode: 'learning',
            name: undefined,
            resource: '123',
            user: undefined,
            queue: []
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
          }

          var proposedState = {
            mode: 'learning',
            name: '123',
            resource: '123',
            user: 'yeehaa',
            queue: []
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
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });

        it("logs the state", function(){
          expect($log.log.logs.length).to.equal(1);
        });
      });
    });

    describe("queue", function(){
      it("delegates to the queue service", function(){
        var returnValue = dispatcher.queue();
        expect(setQueueStub).calledOnce;
        expect(returnValue).to.equal('123');
      });
    });
  });

})();
