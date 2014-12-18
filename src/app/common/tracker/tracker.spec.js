(function(){

  describe("tracker", function(){
    var appState;
    var $log;
    var notification;
    var mockUser;

    beforeEach(function(){

      var permission = {
          set: function(){}
      }

      var currentUser = {
        setId: function(){},
        getId: function(){}
      };

      mockUser = sinon.mock(currentUser);

      module('unacademic.common.tracker',  function($provide){
        $provide.value('permission', permission);
        $provide.value('currentUser', currentUser);
      });

      inject(function(_appState_, _$log_){
        appState = _appState_;
        $log = _$log_;
      });
    });

    describe("switch routes", function(){

      var routeChange;

      describe("without an argument", function(){

        beforeEach(function(){
          routeChange = appState.go();
        });

        it("returns false", function(){
          expect(routeChange).to.be.false;
        });

        it("logs a warning message", function(){
          expect($log.warn.logs.length).to.equal(1);
        });
      });

      describe("with an argument", function(){

        describe("if switchable is false", function(){
          beforeEach(function(){
            appState.canSwitch(false)
            routeChange = appState.go('paths.new');
          });

          it("returns false", function(){
            expect(routeChange).to.be.false;
          });

          it("logs a message", function(){
            expect($log.warn.logs.length).to.equal(1);
          });
        });

        describe("when switchable is true", function(){
          beforeEach(function(){
            appState.canSwitch(true)
            routeChange = appState.go('paths.new');
          });

          it("returns true", function(){
            expect(routeChange).to.be.true;
          });

          it("logs a message", function(){
            expect($log.log.logs.length).to.equal(1);
          });
        });
      });
    });

    describe("change modes", function(){

      describe('defaults', function(){
        it('defaults to learning', function(){
          expect(appState.getMode()).to.equal('learning');
        });
      });

      describe("setMode", function(){

        describe("without a current user", function(){

          beforeEach(function(){
            mockUser.expects('getId').once().returns(undefined);
            appState.setMode('curation');
          });

          it('does not change state', function(){
            expect(appState.getMode()).to.equal('learning');
          });

          it("logs a message", function(){
            expect($log.warn.logs.length).to.equal(1);
          });
        });

        describe("with a current user", function(){

          beforeEach(function(){
            mockUser.expects('getId').once().returns('123');
          });

          describe("when not switchable", function(){
            beforeEach(function(){
              appState.canSwitch(false);
              setMode = appState.setMode('curation');
            });

            it("fails to change state", function(){
              expect(appState.getMode()).to.equal('learning');
            });

            it("logs a warning message", function(){
              expect($log.warn.logs.length).to.equal(1);
            });

            it("returns false", function(){
              expect(setMode).to.be.false;
            });
          });

          describe("when switchable", function(){

            describe("invalid value", function(){

              beforeEach(function(){
                setMode = appState.setMode('bla');
              });

              it("fails to change state", function(){
                expect(appState.getMode()).to.equal('learning');
              });

              it("logs a warning message", function(){
                expect($log.warn.logs.length).to.equal(1);
              });

              it("returns false", function(){
                expect(setMode).to.be.false;
              });
            });

            describe("valid value", function(){


              beforeEach(function(){
                var getNotified = function(){
                  notification = appState.getMode();
                }

                appState.registerObserverCallback(getNotified);
                appState.canSwitch(false);
                appState.setMode('curation');
              });

              describe("without explicit permission", function(){

                it("is not allowed", function(){
                  expect(appState.getMode()).to.equal('learning');
                });
              });

              describe("with explicit permission", function(){
                beforeEach(function(){
                  appState.canSwitch(true);
                  appState.setMode('curation');
                });

                it("is allowed", function(){
                  expect(appState.getMode()).to.equal('curation');
                });

                it("notifies observers", function(){
                  expect(notification).to.equal('curation');
                });
              });
            });
          });
        });
      });
    });
  });
})();
