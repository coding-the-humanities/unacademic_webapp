(function(){

  describe("queue", function(){
    var queue;
    var $log;

    beforeEach(function(){

      module('unacademic.common.queue');

      inject(function(_queue_, _$log_){
        queue = _queue_;
        $log = _$log_;
      });
    });

    describe("current user id", function(){

      it("is an empty array by default", function(){
        expect(queue.get().size).to.equal(0);
      });

      describe("set", function(){
        var returnValue;

        describe("adding models", function(){
          beforeEach(function(){
            returnValue = queue.set({add: '123'});
          });

          it("should return true", function(){
            expect(returnValue).to.be.true;
          });

          it("should increase the count by one", function(){
            expect(queue.get().size).to.equal(1);
          });
        })

        describe("removing models", function(){
          beforeEach(function(){
            returnValue = queue.set({add: '123'});
            returnValue = queue.set({add: '453'});
            returnValue = queue.set({remove: '123'});
          });

          it("should return true", function(){
            expect(returnValue).to.be.true;
          });

          it("should increase the count by one", function(){
            expect(queue.get().size).to.equal(1);
          });
        });

        it("is not possible to add and remove at the same time", function(){
          returnValue = queue.set({add: '123', remove: '345'});
          expect($log.warn.logs.length).to.equal(1);
          expect($log.warn.logs[0][0]).to.contain('add and remove');
          expect(returnValue).to.be.false;
        });

      })
    })
  });
})();


