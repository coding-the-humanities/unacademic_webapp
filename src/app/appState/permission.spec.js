(function(){

  describe("permission", function(){
    var permission;
    var $log;
    var currentState;
    var nextState;
    var isAllowed;

    beforeEach(function(){

      module('unacademic.appState.permission');

      inject(function(_permission_, _$log_){
        permission = _permission_;
        $log = _$log_;
      });
    });

    describe("general", function(){

      describe("invalid app mode", function(){
        beforeEach(function(){

          currentState = {
            user: 'yeehaa',
            mode: 'learning',
            name: '123'
          }

          nextState = {
            user: 'yeehaa',
            mode: 'bla',
            name: '123',
            queue: new Set()
          }

          isAllowed = permission.get(nextState, currentState);
        });

        it("is not allowed to switch", function(){
          expect(isAllowed).to.deep.equal({});
          expect($log.warn.logs.length).to.equal(1);
          expect($log.warn.logs[0][0]).to.contain('appmode');
        });
      });

      describe("no changes", function(){
        beforeEach(function(){

          currentState = {
            user: 'yeehaa',
            mode: 'learning',
            name: '123'
          }

          nextState = {
            user: 'yeehaa',
            mode: 'learning',
            name: '123',
            queue: new Set()
          }

          isAllowed = permission.get(nextState, currentState);
        });

        it("is not allowed to switch", function(){
          expect(isAllowed).to.deep.equal({});
        });
      });
    });

    describe("resource changes", function(){
      describe("no changes", function(){
        beforeEach(function(){

          currentState = {
            mode: 'browsing',
            resource: {
              id: '123',
              curator: 'yeehaa'
            }
          }

          nextState = {
            mode: 'browsing',
            resource: {
              id: '123',
              curator: 'yeehaa',
            },
            queue: new Set()
          }

          isAllowed = permission.get(nextState, currentState);
        });

        it("is not allowed to switch", function(){
          expect(isAllowed).to.deep.equal({});
        });
      })

      describe("changes", function(){
        beforeEach(function(){

          currentState = {
            mode: 'browsing',
            resource: {
              id: '123',
              curator: 'yeehaa'
            }
          }

          nextState = {
            mode: 'browsing',
            resource: {
              id: '456',
              curator: 'yeehaa',
            },
            queue: new Set()
          }

          isAllowed = permission.get(nextState, currentState);
        });

        it("is not allowed to switch", function(){
          expect(isAllowed.resource.id).to.equal('456');
        });

        xit("always includes the view name", function(){
          expect(isAllowed.name).not.to.be.undefined;
        });

      })
    });


    describe("queue", function(){
      describe("is full", function(){
        beforeEach(function(){

          currentState = {
            mode: 'learning',
            user: 'yeehaa'
          }

          nextState = {
            mode: 'curation',
            user: 'yeehaa',
            queue: new Set([1,2,3])
          }

          isAllowed = permission.get(nextState, currentState);
        });

        it("is not allowed to switch", function(){
          expect(isAllowed).to.deep.equal({});
          expect($log.warn.logs.length).to.equal(1);
          expect($log.warn.logs[0][0]).to.contain('locked');
        });
      });
    });

    describe("browsing mode", function(){

      beforeEach(function(){

        currentState = {
          user: '',
          mode: 'browsing',
          name: '123'
        }

      });

      it("is not allowed to switch to learning", function(){

        nextState = {
          user: '',
          mode: 'learning',
          name: '123',
          queue: new Set()
        }

        isAllowed = permission.get(nextState, currentState);
        expect(isAllowed).to.deep.equal({});
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });

      it("is not allowed to switch to curation", function(){

        nextState = {
          user: '',
          mode: 'curation',
          name: '123',
          queue: new Set()
        }

        isAllowed = permission.get(nextState, currentState);
        expect(isAllowed).to.deep.equal({});
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });

      it("is allowed to switch routes", function(){

        nextState = {
          user: '',
          mode: 'browsing',
          name: '345',
          queue: new Set()
        }

        isAllowed = permission.get(nextState, currentState);
        expect(isAllowed).to.eql({name: '345'});
      });
    });

    describe("learning mode", function(){

      beforeEach(function(){

        currentState = {
          user: 'yeehaa',
          mode: 'learning',
          name: '123'
        }

      });

      it("is allowed to switch to curation", function(){

        nextState = {
          user: 'yeehaa',
          mode: 'curation',
          name: '123',
          queue: new Set()
        }

        isAllowed = permission.get(nextState, currentState);
        expect(isAllowed).to.eql({mode: 'curation'});
      });

      it("is not allowed to switch to browsing", function(){

        nextState = {
          user: 'yeehaa',
          mode: 'browsing',
          name: '123',
          queue: new Set()
        }

        isAllowed = permission.get(nextState, currentState);
        expect(isAllowed).to.deep.equal({});
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });

    describe("curation mode", function(){

      beforeEach(function(){

        currentState = {
          user: 'yeehaa',
          mode: 'curation',
          name: '123'
        }
      });

      it("is allowed to switch to learning", function(){

        nextState = {
          user: 'yeehaa',
          mode: 'learning',
          name: '123',
          queue: new Set()
        }

        isAllowed = permission.get(nextState, currentState);
        expect(isAllowed).to.eql({mode: 'learning'});
      });

      it("is not allowed to switch to browsing", function(){

        nextState = {
          user: 'yeehaa',
          mode: 'browsing',
          name: '123',
          queue: new Set()
        }

        isAllowed = permission.get(nextState, currentState);
        expect(isAllowed).to.deep.equal({});
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });
  })
})();
