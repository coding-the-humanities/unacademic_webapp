(function(){

  describe("switcher", function(){
    var switcher;
    var $state;

    beforeEach(function(){
      $state = {};
      $state.go = sinon.stub();
      dispatcher = {};
      dispatcher.getState = sinon.stub();

      dispatcher.registerObserverCallback = sinon.stub();

      module('unacademic.appState.switcher',  function($provide){
        $provide.value('$state', $state);
        $provide.value('dispatcher', dispatcher);
      });

      inject(function(_switcher_){
        switcher = _switcher_;
      });

    });

    describe("initialize", function(){
      it("registers the observer", function(){
        switcher.initialize();
        expect(dispatcher.registerObserverCallback).called;
      });

    });

    describe("state switching", function(){
      var state;

      describe("it has neither a name nor resource", function(){

        beforeEach(function(){
          dispatcher.registerObserverCallback = sinon.stub().callsArg(0);
          dispatcher.getState = sinon.stub().returns({waypoints: 'waypoints.detail'});
          switcher.initialize();
        });

        it("gets the currentState", function(){
          expect(dispatcher.getState).called;
        });

        it("does nothing", function(){
          expect($state.go).not.called;
        });
      });

      describe("it has a name but no resource", function(){


        beforeEach(function(){
          state = { name: 'waypoints.detail' };
          dispatcher.registerObserverCallback = sinon.stub()
            .callsArg(0)
          dispatcher.getState = sinon.stub().returns(state);
          switcher.initialize();
        });

        it("gets the currentState", function(){
          expect(dispatcher.getState).called;
        });

        it("does nothing", function(){
          expect($state.go).to.be.calledWithExactly(state.name);
        });
      });

      describe("it has a name and a resource", function(){

        beforeEach(function(){
          state = {
            name: 'waypoints.detail',
            resource: '123'
          };
          dispatcher.registerObserverCallback = sinon.stub()
            .callsArg(0)
          dispatcher.getState = sinon.stub().returns(state);
          switcher.initialize();
        });

        it("gets the currentState", function(){
          expect(dispatcher.getState).called;
        });

        it("does nothing", function(){
          expect($state.go).to.be.calledWithExactly(state.name, {waypointId: state.resource});
        });
      });

    })
  });
})();


