(function(){

  describe("mode", function(){
    var mode;
    var $log;
    var mockPermission;

    beforeEach(function(){

      var permission = {
        get: function(){}
      };

      mockPermission = sinon.mock(permission);

      module('unacademic.common.mode',  function($provide){
        $provide.value('permission', permission);
      });

      inject(function(_mode_, _$log_){
        mode = _mode_;
        $log = _$log_;
      });
    });

    describe("change modes", function(){

      describe("defaults", function(){
        it("defaults to learning", function(){
          expect(mode.get()).to.equal('browsing');
        });
      });

      describe("setMode", function(){

        describe("when permission is true", function(){
          var notification;
          var setMode;

          beforeEach(function(){
            mockPermission.expects('get').once().returns(true);

            var getNotified = function(){
              notification = mode.get();
            }

            mode.registerObserverCallback(getNotified);
            setMode = mode.set("learning");
          });

          it("sets the mode to learning", function(){
            expect(mode.get()).to.equal("learning");
          });

          it("returns true", function(){
            expect(setMode).to.be.true;
          });

          it("notifies observers", function(){
            expect(notification).to.equal("learning");
          });
        });

        describe("when permission is false", function(){
          var notification;
          var setMode;

          beforeEach(function(){
            mockPermission.expects('get').once().returns(false);

            var getNotified = function(){
              notification = mode.get();
            }

            mode.registerObserverCallback(getNotified);
            setMode = mode.set("learning");
          });

          it("does not change the mode", function(){
            expect(mode.get()).to.equal("browsing");
          });

          it("returns false", function(){
            expect(setMode).to.be.false;
          });

          it("does not notify observers", function(){
            expect(notification).to.be.undefined;
          });
        });
      });
    });
  });
})();
