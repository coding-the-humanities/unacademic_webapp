(function(){

  describe("permission", function(){
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

    describe("general", function(){

      beforeEach(function(){
        state = {
          user: 'yeehaa',
          mode: 'learning'
        }
      });

      it("is not allowed to an invalid app mode", function(){
        state.nextMode = 'bla';
        expect(permission.get(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('appmode');
      });
    });

    describe("browsing mode", function(){

      beforeEach(function(){
        state = {
          user: '',
          mode: 'browsing'
        }
      });

      it("is not allowed to switch to learning", function(){
        state.nextMode = 'learning';
        expect(permission.get(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });

      it("is not allowed to switch to curation", function(){
        state.nextMode = 'curation';
        expect(permission.get(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });
    });

    describe("learning mode", function(){

      beforeEach(function(){
        state = {
          user: 'yeehaa',
          mode: 'learning'
        }
      });

      it("is allowed to switch to curation", function(){
        state.nextMode = 'curation';
        expect(permission.get(state)).to.be.true;
        expect($log.log.logs.length).to.equal(1);
        expect($log.log.logs[0][0]).to.contain('learning to curation');
      });

      it("is not allowed to switch to browsing", function(){
        state.nextMode = 'browsing';
        expect(permission.get(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });

    describe("curation mode", function(){

      beforeEach(function(){
        state = {
          user: 'yeehaa',
          mode: 'curation'
        }
      });

      it("is allowed to switch to learning", function(){
        state.nextMode = 'learning';
        expect(permission.get(state)).to.be.true;
        expect($log.log.logs.length).to.equal(1);
        expect($log.log.logs[0][0]).to.contain('curation to learning');
      });

      it("is not allowed to switch to browsing", function(){
        state.nextMode = 'browsing';
        expect(permission.get(state)).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });
  })
})();
