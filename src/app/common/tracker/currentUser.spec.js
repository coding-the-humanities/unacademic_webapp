(function(){

  describe("currentUser", function(){
    var currentUserId;
    var $log;

    beforeEach(function(){

      module('unacademic.common.currentUser');

      inject(function(_currentUser_, _$log_){
        currentUser = _currentUser_;
        $log = _$log_;
      });
    });

    describe("current user id", function(){

      it("is undefined by default", function(){
        expect(currentUser.getId()).to.be.undefined;
      });

      describe("set", function(){
        var userId;
        var setUserId;
        var notification;

        beforeEach(function(){
          userId = 'John123';

          var getNotified = function(){
            notification = currentUser.getId();
          }

          currentUser.registerObserverCallback(getNotified);
          setUserId = currentUser.setId(userId);
        });


        it("returns true", function(){
          expect(setUserId).to.be.true;
        });

        it("can be set", function(){
          expect(currentUser.getId()).to.equal(userId);
        });

        it("notifies observers", function(){
          expect(notification).to.equal(userId);
        });
      })
    })
  });
})();


