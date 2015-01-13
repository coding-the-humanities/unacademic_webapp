(function(){

  describe("dispatcher", function(){
    var dispatcher;
    var $rootScope;

    var currentState;
    var queue;
    var modules;
    var switcher;

    var permissionMock;

    beforeEach(function(){

      currentState = {}

      currentState.get = sinon.stub().returns({mode: '123'});
      currentState.set = sinon.spy();

      queue = {}

      queue.get = sinon.stub().returns(['123']);
      queue.set = sinon.spy();

      var permission = {
        get: function(){}
      };

      var switcher = {}

      permissionMock = sinon.mock(permission);

      module('unacademic.appState.dispatcher',  function($provide){
        $provide.value('permission', permission);
        $provide.value('queue', queue);
        $provide.value('switcher', switcher);
        $provide.value('currentState', currentState);
      });

      inject(function(_dispatcher_, _$q_, _$rootScope_){
        dispatcher = _dispatcher_;
        $q = _$q_;
        $rootScope = _$rootScope_;
      });

      var promise = $q.when();
      switcher.set = sinon.stub().returns(promise);
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
          dispatcher.setState({user: 'yeehaa'});
        });

        it("does not notify observers", function(){
          expect(notificationSpy).not.called;
        });

        it("does not set any value", function(){
          expect(currentState.set).not.called;
        });
      });

      describe("with changes", function(){

        beforeEach(function(){

          var currentState = {
            mode: '123',
            queue: ['123']
          }

          var state = {
            mode: 'learning',
            resource: '123',
          }


          permissionMock.expects('get')
            .withArgs(currentState, state)
            .once()
            .returns(state);

          dispatcher.setState(state);
          $rootScope.$digest();
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
