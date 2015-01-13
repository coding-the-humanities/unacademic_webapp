(function(){

  xdescribe("dispatcher", function(){
    var dispatcher;

    var currentState;
    var queue;
    var modules;

    var permissionMock;

    beforeEach(function(){

      currentState = {
        name: 'currentState',
        get: function(){},
        set: function(){}
      }

      currentState.get = sinon.stub().returns({mode: '123'});
      currentState.set = sinon.spy();

      queue = {
        name: 'queue',
        get: function(){},
        set: function(){}
      }

      queue.get = sinon.stub().returns(['123']);
      queue.set = sinon.spy();

      var permission = {
        get: function(){}
      };

      permissionMock = sinon.mock(permission);

      module('unacademic.appState.dispatcher',  function($provide){
        $provide.value('permission', permission);
        $provide.value('queue', queue);
        $provide.value('currentState', currentState);
      });

      inject(function(_dispatcher_){
        dispatcher = _dispatcher_;
      });
    });


    describe("get", function(){
      var state;

      beforeEach(function(){
        state = dispatcher.getState();
      })

      it("gets the currentState", function(){
        expect(currentState.get).calledOnce;
      });

      it("gets the queue", function(){
        expect(queue.get).calledOnce;
      });

      it("returns a composite object", function(){
        expect(state).to.deep.equal({mode: '123', queue: ['123']});
      });
    });

    describe("set", function(){
      var notificationSpy;
      var getAppStateSpy;

      beforeEach(function(){
        notificationSpy = sinon.spy();
        dispatcher.registerObserverCallback(notificationSpy);
      });

      afterEach(function(){
        permissionMock.verify();
      });

      describe("with no changes", function(){

        beforeEach(function(){
          permissionMock.expects('get').once().returns({});
          setState = dispatcher.setState({user: 'yeehaa'});
        });

        it("returns false", function(){
          expect(setState).to.be.undefined;
        });

        it("does not notify observers", function(){
          expect(notificationSpy).not.called;
        });

        it("does not set any value", function(){
          expect(currentState.set).not.called;
        });
      });

      describe("with one change", function(){

        beforeEach(function(){

          var proposedState = {
            mode: 'learning',
            queue: ['123']
          }

          var currentState = {
            mode: '123',
            queue: ['123']
          }

          var state = {
            mode: 'learning',
          }

          permissionMock.expects('get')
            .withArgs(proposedState, currentState)
            .once()
            .returns(state);

          setState = dispatcher.setState(state);
        });

        it("sets the values", function(){
          expect(currentState.set).called;
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });
      });

      describe("with multiple changes", function(){

        beforeEach(function(){

          var proposedState = {
            mode: 'learning',
            resource: '123',
            queue: ['123']
          }

          var currentState = {
            mode: '123',
            resource: '123',
            queue: ['123']
          }

          var state = {
            mode: 'learning',
            resource: '123',
          }


          permissionMock.expects('get')
            .withArgs(proposedState)
            .once()
            .returns(state);

          setState = dispatcher.setState(state);
        });

        it("sets the values", function(){
          expect(currentState.set).called;
          expect(queue.set).not.called;
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });
      });
    });

    describe("queue", function(){
      it("delegates to the queue service", function(){
        var returnValue = dispatcher.queue();
        expect(queue.set).calledOnce;
      });
    });
  });

})();
