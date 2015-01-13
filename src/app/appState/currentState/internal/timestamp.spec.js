(function(){

  describe("timestamp", function(){
    var timestamp;
    var $log;

    beforeEach(function(){

      module('unacademic.appState.currentState.timestamp');

      inject(function(_timestamp_){
        timestamp = _timestamp_;
      });
    });

    describe("timestamp name", function(){

      it("is set to its internal value on subsequent calls", function(){
        expect(timestamp.get()).to.be.undefined;
      });

      describe("set", function(){
        var time;

        beforeEach(function(){
          time = '123';
          setTime = timestamp.set(time);
        });


        it("returns true", function(){
          expect(setTime).to.be.true;
        });

        it("can be set", function(){
          expect(timestamp.get()).to.equal(time);
        });
      })
    })
  });
})();
