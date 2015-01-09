(function(){

  describe("history", function(){
    var history;
    var $state;
    var state1;
    var state2;


    beforeEach(function(){
      dispatcher = {};
      dispatcher.getState = sinon.stub();

      dispatcher.registerObserverCallback = sinon.stub();

      module('unacademic.appState.history',  function($provide){
        $provide.value('dispatcher', dispatcher);
      });

      inject(function(_history_, _$log_){
        history = _history_;
      });

      state1 = {
        waypoints: 'waypoints.detail',
      }

      state2 = {
        waypoints: 'waypoints.index',
      }

      state3 = {
        waypoints: 'waypoints.other',
      }

      state4 = {
        waypoints: 'waypoints.any',
      }

      state5 = {
        waypoints: 'waypoints.any',
        timestamp: '123'
      }
    });

    describe("initialize", function(){
      it("registers the observer", function(){
        history.initialize();
        expect(dispatcher.registerObserverCallback);
      });

    });

    describe("time travel", function(){

      beforeEach(function(){
        history.initialize();
        dispatcher.getState = sinon.stub().returns(state1);
        dispatcher.registerObserverCallback.callArg(0);
        dispatcher.getState = sinon.stub().returns(state2);
        dispatcher.registerObserverCallback.callArg(0);
        expect(history.get().length).to.equal(2);
      });

      describe("previous", function(){


        it("return the previous state", function(){
          expect(history.previous()).to.equal(state1);
        });

        it("returns the last state if at beginning", function(){
          history.previous();
          history.previous();
          expect(history.previous()).to.equal(state1);
        });
      });

      describe("next", function(){
        beforeEach(function(){
          history.previous();
        });

        it("return the next state", function(){
          expect(history.next()).to.equal(state2);
        });

        it("returns the first state if at end", function(){
          history.next();
          expect(history.next()).to.equal(state2);
        });
      });

      describe("reset", function(){

        beforeEach(function(){
          history.previous();
          dispatcher.getState = sinon.stub().returns(state3);
          dispatcher.registerObserverCallback.callArg(0);
          dispatcher.getState = sinon.stub().returns(state4);
          dispatcher.registerObserverCallback.callArg(0);
        });

        it("adds the state to the history", function(){
          expect(history.get().length).to.equal(3);
          expect(history.get()).to.contain(state3);
        });

        it("removes the detour from the history", function(){
          expect(history.get()).not.to.contain(state2);
        });

        it("resets the index", function(){
          expect(history.previous()).to.equal(state3);
        });
      });

      describe("reset", function(){
        beforeEach(function(){
          history.previous();
          dispatcher.getState = sinon.stub().returns(state5);
          dispatcher.registerObserverCallback.callArg(0);
        });

        it("does not add the state to the history", function(){
          expect(history.get().length).to.equal(2);
          expect(history.get()).not.to.contain(state5);
        });

        it("does not reset the index", function(){
          expect(history.next()).to.equal(state2);
        });
      });
    });
  });
})();
