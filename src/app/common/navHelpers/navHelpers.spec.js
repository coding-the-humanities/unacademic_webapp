(function(){

  describe("navHelpers", function(){
    var navHelpers;
    var dispatcher;
    var $rootScope;
    var $q;

    beforeEach(function(){
      dispatcher = {}
      dispatcher.queue = sinon.stub();
      dispatcher.getState = sinon.stub().returns({user: 'yeehaa'});
      dispatcher.setState = sinon.stub();

      history = {}

      module('unacademic.common.navHelpers',  function($provide){
        $provide.value('dispatcher', dispatcher);
        $provide.value('history', history);
      });

      inject(function(_navHelpers_, _$rootScope_, _$q_){
        navHelpers = _navHelpers_;
        $rootScope = _$rootScope_;
        $q = _$q_;
      });
    });

    describe("move to an existing resource", function(){

      beforeEach(function(){
        var name = 'courses.detail';
        var resource = {
          id: '123',
          curator: 'yeehaa'
        }
        navHelpers.goTo(name, resource);
      });

      it("does not calls dispatcher to get the current user", function(){
        expect(dispatcher.getState).not.called;
      });

      it("sets the app to the correct state", function(){
        expect(dispatcher.setState).calledWith({
          name: 'courses.detail',
          resource: {
            id: '123',
            curator: 'yeehaa'
          }
        });
      });
    });

    describe("add new course", function(){

      beforeEach(function(){
        var name = 'courses.detail';
        navHelpers.goTo(name);
      });

      it("calls dispatcher to get the current user", function(){
        expect(dispatcher.getState).calledOnce;
      });

      it("can create new courses", function(){
        expect(dispatcher.setState).calledWith({
          name: 'courses.detail',
          resource: {
            id: 'new',
            curator: 'yeehaa'
          }
        });
      });
    });

    describe("move back", function(){


      describe("on initial state", function(){
        beforeEach(function(){
          history.previous = sinon.stub();
          navHelpers.goBack();
        });

        it("calls history to get the previous state", function(){
          expect(history.previous).calledOnce;
        });

        it("calls dispatcher to set the previous state", function(){
          expect(dispatcher.setState).not.called;
        });
      });

      describe("on subsequent states", function(){

        beforeEach(function(){
          history.previous = sinon.stub().returns('123');
          navHelpers.goBack();
        });

        it("calls history to get the previous state", function(){
          expect(history.previous).calledOnce;
        });

        it("calls dispatcher to set the previous state", function(){
          expect(dispatcher.setState).calledWith('123');
        });
      });
    });
  });
})();
