(function(){

  describe("dispatcher", function(){
    var dispatcher;
    var $log;

    var mode;
    var currentUser;
    var view;
    var resource;
    var queue;
    var $state;

    var permissionMock;

    beforeEach(function(){

      mode = {
        name: 'mode',
        get: function(){},
        set: function(){}
      };

      currentUser = {
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

      var modules = [mode, currentUser, view, resource, queue];

      _.each(modules, function(module){
        module['get'] = sinon.spy();
        module['set'] = sinon.spy();
      });

      var permission = {
        get: function(){}
      };

      permissionMock = sinon.mock(permission);

      $state = {
        go: function(){}
      };

      $state.go = sinon.spy();


      module('unacademic.appState.dispatcher',  function($provide){
        $provide.value('permission', permission);
        $provide.value('mode', mode);
        $provide.value('queue', queue);
        $provide.value('currentUser', currentUser);
        $provide.value('$state', $state);
        $provide.value('view', view);
        $provide.value('resource', resource);
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

      it("gets the correct data", function(){
        state = dispatcher.getState();
        var modules = [currentUser, mode, view, resource, queue];
        _.each(modules, function(module){
          expect(module.get).calledOnce;
        })
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
          expect(currentUser.set).not.called;
          expect(mode.set).not.called;
          expect(view.set).not.called;
          expect(resource.set).not.called;
        });

        it("does not change routes", function(){
          expect($state.go).not.called;
        })

        it("does not log state", function(){
          expect($log.log.logs.length).to.equal(0);
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

          var approvedState = {
            mode: 'learning',
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
          expect(currentUser.set).not.called;
          expect(mode.set).calledWith('learning');
          expect(view.set).not.called;
          expect(resource.set).not.called;
        });

        it("does not change routes", function(){
          expect($state.go).not.called;
        })

        it("notifies observers", function(){
          expect(notificationSpy).calledOnce;
        });

        it("logs the state", function(){
          expect($log.log.logs.length).to.equal(1);
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

          var approvedState = {
            mode: 'learning',
            resource: '123',
            name: 'courses.detail',
            user: 'yeehaa',
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
          expect(currentUser.set).calledWith('yeehaa');
          expect(mode.set).calledWith('learning');
          expect(view.set).calledWith('courses.detail');
          expect(resource.set).calledWith('123');
        });

        it("does not change routes", function(){
          expect($state.go).calledWith('courses.detail', {courseId: '123'});
        })


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
        expect(queue.set).calledOnce;
      });
    });
  });

})();
