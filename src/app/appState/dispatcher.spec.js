(function(){

  describe("dispatcher", function(){
    var dispatcher;

    var mode;
    var user;
    var view;
    var resource;
    var queue;

    var permissionMock;

    beforeEach(function(){

      mode = {
        name: 'mode',
        get: function(){},
        set: function(){}
      };

      user = {
        name: 'user',
        get: function(){},
        set: function(){}
      };

      view = {
        name: 'name',
        get: function(){},
        set: function(){}
      }

      resource = {
        name: 'resource',
        get: function(){},
        set: function(){}
      }

      queue = {
        name: 'queue',
        get: function(){},
        set: function(){}
      }

      var modules = [mode, user, view, resource, queue];

      _.each(modules, function(module){
        module['get'] = sinon.spy();
        module['set'] = sinon.spy();
      });

      var permission = {
        get: function(){}
      };

      permissionMock = sinon.mock(permission);

      module('unacademic.appState.dispatcher',  function($provide){
        $provide.value('permission', permission);
        $provide.value('mode', mode);
        $provide.value('queue', queue);
        $provide.value('user', user);
        $provide.value('view', view);
        $provide.value('resource', resource);
      });

      inject(function(_dispatcher_){
        dispatcher = _dispatcher_;
      });
    });

    afterEach(function(){
      permissionMock.verify();
    });

    describe("get", function(){
      var state;

      beforeEach(function(){
        state =dispatcher.getState();
      })

      it("gets the correct data", function(){
        var modules = [user, mode, view, resource, queue];
        _.each(modules, function(module){
          expect(module.get).calledOnce;
        })
      });

      it("does not include a timestamp", function(){
        expect(state).not.to.include.keys('timestamp');
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
          permissionMock.expects('get').once().returns(false);
          setState = dispatcher.setState({user: 'yeehaa'});
        });

        it("returns false", function(){
          expect(setState).to.be.undefined;
        });

        it("does not notify observers", function(){
          expect(notificationSpy).not.called;
        });

        it("does not set any value", function(){
          expect(user.set).not.called;
          expect(mode.set).not.called;
          expect(view.set).not.called;
          expect(resource.set).not.called;
        });
      });

      describe("with one change", function(){

        beforeEach(function(){

          var proposedState = {
            mode: 'learning',
            resource: undefined,
            user: undefined,
            name: undefined,
            queue: undefined
          }

          var state = {
            mode: 'learning',
          }

          permissionMock.expects('get')
            .withArgs(proposedState)
            .once()
            .returns(state);

          setState = dispatcher.setState(state);
        });

        it("sets the values", function(){
          expect(user.set).not.called;
          expect(mode.set).calledWith('learning');
          expect(view.set).not.called;
          expect(resource.set).not.called;
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
            user: 'yeehaa',
            name: 'courses.detail',
            queue: undefined
          }

          var state = {
            mode: 'learning',
            resource: '123',
            name: 'courses.detail',
            user: 'yeehaa',
          }


          permissionMock.expects('get')
            .withArgs(proposedState)
            .once()
            .returns(state);

          setState = dispatcher.setState(state);
        });

        it("sets the values", function(){
          expect(user.set).calledWith('yeehaa');
          expect(mode.set).calledWith('learning');
          expect(view.set).calledWith('courses.detail');
          expect(resource.set).calledWith('123');
        });

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });
      });
    });

    describe("timestamp", function(){

      describe("without change", function(){

        beforeEach(function(){

          var state = {
            mode: 'learning',
            timestamp: '123',
          }

          permissionMock.expects('get').returns(false);

          setState = dispatcher.setState(state);
        });

        it("sets the values", function(){
          expect(dispatcher.getState().timestamp).to.equal(undefined);
        });
      });

      describe("with change", function(){

        beforeEach(function(){

          var state = {
            mode: 'learning',
            timestamp: '123',
          }

          permissionMock.expects('get').returns({mode: 'learning'});

          setState = dispatcher.setState(state);
        });

        it("sets the values", function(){
          expect(dispatcher.getState().timestamp).to.equal('123');
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
