(function(){

  describe("history", function(){
    var history;
    var $state;

    beforeEach(function(){
      dispatcher = {};
      dispatcher.getState = sinon.stub();

      dispatcher.registerObserverCallback = sinon.stub();

      module('unacademic.appState.history',  function($provide){
        $provide.value('dispatcher', dispatcher);
      });

      inject(function(_history_, _$log_){
        history = _history_;
        $log = _$log_;
      });
    });

    describe("initialize", function(){
      it("registers the observer", function(){
        history.initialize();
        expect(dispatcher.registerObserverCallback);
      });

    });

    describe("state switching", function(){
      var state;

      beforeEach(function(){
        dispatcher.registerObserverCallback = sinon.stub().callsArg(0);
        dispatcher.getState = sinon.stub().returns({waypoints: 'waypoints.detail'});
        history.initialize();
      });

      it("gets the currentState", function(){
        expect(dispatcher.getState).called;
      });

      it("adds the current state to its backlog", function(){
        expect(history.get().length).to.equal(1);
      });
    })
  });
})();
