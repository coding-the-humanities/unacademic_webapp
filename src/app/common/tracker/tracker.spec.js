(function(){

  describe("tracker", function(){
    var appState;
    var $log;

    beforeEach(function(){
      module('unacademic.common.tracker');
      inject(function(_appState_, _$log_){
        appState = _appState_;
        $log = _$log_;
      });
    });

    describe("current user id", function(){

      it("is undefined by default", function(){
        expect(appState.getCurrentUserId()).to.be.undefined;
      });

      describe("set", function(){
        var userId;
        var setUserId;
        var notification;

        beforeEach(function(){
          userId = 'John123';

          var getNotified = function(){
            notification = appState.getCurrentUserId();
          }

          appState.registerObserverCallback(getNotified);
          setUserId = appState.setCurrentUserId(userId);
        });


        it("returns true", function(){
          expect(setUserId).to.be.true;
        });

        it("can be set", function(){
          expect(appState.getCurrentUserId()).to.equal(userId);
        });

        it("notifies observers", function(){
          expect(notification).to.equal(userId);
        });
      })
    })

    describe("can switch", function(){
      it("is set to true by default", function(){
        expect(appState.canSwitch()).to.be.true;
      });

      it("can be set to false", function(){
        appState.canSwitch(false);
        expect(appState.canSwitch()).to.be.false;
      })

      it("can be set to false", function(){
        appState.canSwitch(false);
        appState.canSwitch(true);
        expect(appState.canSwitch()).to.be.true;
      })

    })

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

      describe('getMode', function(){
        it('defaults to learning', function(){
          expect(appState.getMode()).to.equal('learning');
        });
      });

      describe("setMode", function(){
        var setMode;

        describe("without a current user", function(){

          beforeEach(function(){
            setMode = appState.setMode('curation');
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
            appState.setCurrentUserId('123');
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

              describe("from learning to curation", function(){
                var notification;

                beforeEach(function(){
                  var getNotified = function(){
                    notification = appState.getMode();
                  }

                  appState.registerObserverCallback(getNotified);
                  setMode = appState.setMode('curation');
                });

                it("successfully changes state", function(){
                  expect(appState.getMode()).to.equal('curation');
                });

                it("returns true", function(){
                  expect(setMode).to.be.true;
                });

                it("notifies observers", function(){
                  expect(notification).to.equal('curation');
                });

                it("sets switchable to false", function(){
                  expect(appState.canSwitch()).to.be.false;
                });
              });

              describe("from curation to learning", function(){

                beforeEach(function(){
                  var getNotified = function(){
                    notification = appState.getMode();
                  }

                  appState.registerObserverCallback(getNotified);
                  appState.setMode('curation');
                });

                describe("without explicit permission", function(){
                  beforeEach(function(){
                    appState.setMode('learning');
                  });

                  it("is not allowed", function(){
                    expect(appState.getMode()).to.equal('curation');
                  });
                });

                describe("with explicit permission", function(){
                  beforeEach(function(){
                    appState.canSwitch(true);
                    appState.setMode('learning');
                  });

                  it("is allowed", function(){
                    expect(appState.getMode()).to.equal('learning');
                  });

                  it("notifies observers", function(){
                    expect(notification).to.equal('learning');
                  });
                });

              });
            });
          });
        });
      });
    });
  });
})();
