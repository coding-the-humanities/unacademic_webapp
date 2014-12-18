(function(){

  describe("tracker", function(){
    var permission;
    var $log;
    var state;

    beforeEach(function(){
      module('unacademic.common.permission');
      inject(function(_permission_, _$log_){
        permission = _permission_;
        $log = _$log_;
      });
    });

    describe("browsing mode", function(){

      it("is not allowed to switch to learning", function(){

        state = {
          user: '',
          currentMode: 'browsing',
          nextMode: 'learning',
        }

        expect(permission(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });

      it("is not allowed to switch to curation", function(){

        state = {
          user: '',
          currentMode: 'browsing',
          nextMode: 'learning',
        }

        expect(permission(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });
    });

    describe("learning mode", function(){

      it("is allowed to switch to curation", function(){

        state = {
          user: 'yeehaa',
          currentMode: 'browsing',
          nextMode: 'curation',
        }

        expect(permission(state)).to.be.true;
      });

      it("is not allowed to switch to browsing", function(){

        state = {
          user: 'yeehaa',
          currentMode: 'learning',
          nextMode: 'browsing',
        }

        expect(permission(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });

    describe("curation mode", function(){

      it("is not allowed to switch to learning without explicit permission", function(){

        state = {
          user: 'yeehaa',
          currentMode: 'curation',
          nextMode: 'learning',
        }

        expect(permission(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('prevent mode switch');
      });

      it("is allowed to switch to learning with explicit permission", function(){

        state = {
          user: 'yeehaa',
          currentMode: 'curation',
          nextMode: 'learning',
          switchable: true
        }

        expect(permission(state)).to.be.true;
      });

      it("is not allowed to switch to browsing", function(){

        state = {
          user: 'yeehaa',
          currentMode: 'learning',
          nextMode: 'browsing',
          switchable: true
        }

        expect(permission(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });
  })
})();
