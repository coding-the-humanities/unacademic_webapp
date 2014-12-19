(function(){

  describe("permission", function(){
    var permission;
    var $log;
    var mockAppState;

    beforeEach(function(){

      var appState = {
        get: function(){}
      };

      mockAppState = sinon.mock(appState);

      module('unacademic.common.permission',  function($provide){
        $provide.value('appState', appState);
      });

      inject(function(_permission_, _$log_){
        permission = _permission_;
        $log = _$log_;
      });
    });

    describe("general", function(){

      beforeEach(function(){
        var state = {
          user: 'yeehaa',
          mode: 'learning'
        }

        mockAppState.expects('get').returns(state);
      });

      it("is not allowed to an invalid app mode", function(){
        expect(permission.get({nextMode: 'bla'})).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('appmode');
      });
    });

    describe("browsing mode", function(){

      beforeEach(function(){
        var state = {
          user: '',
          mode: 'browsing'
        }

        mockAppState.expects('get').returns(state);
      });

      it("is not allowed to switch to learning", function(){
        expect(permission.get({nextMode: 'learning'})).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });

      it("is not allowed to switch to curation", function(){
        expect(permission.get({nextMode: 'curation'})).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('signing in');
      });
    });

    describe("learning mode", function(){

      beforeEach(function(){
        var state = {
          user: 'yeehaa',
          mode: 'learning'
        }

        mockAppState.expects('get').returns(state);
      });

      it("is allowed to switch to curation", function(){
        expect(permission.get({nextMode: 'curation'})).to.be.true;
        expect($log.log.logs.length).to.equal(1);
        expect($log.log.logs[0][0]).to.contain('learning to curation');
      });

      it("is not allowed to switch to browsing", function(){
        expect(permission.get({nextMode: 'browsing'})).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });

    describe("curation mode", function(){

      it("is not allowed to switch to learning without explicit permission", function(){

        var state = {
          user: 'yeehaa',
          mode: 'curation'
        }

        mockAppState.expects('get').returns(state);

        expect(permission.get({nextMode: 'learning'})).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('prevent mode switch');
      });

      it("is allowed to switch to learning with explicit permission", function(){

        var state = {
          user: 'yeehaa',
          mode: 'curation',
          switchable: true
        }

        mockAppState.expects('get').returns(state);

        expect(permission.get({nextMode: 'learning'})).to.be.true;
        expect($log.log.logs.length).to.equal(1);
        expect($log.log.logs[0][0]).to.contain('curation to learning');
      });

      it("is not allowed to switch to browsing", function(){

        var state = {
          user: 'yeehaa',
          mode: 'learning',
          switchable: true
        }

        mockAppState.expects('get').returns(state);

        expect(permission.get({nextMode: 'browsing'})).to.be.false;
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('browsing mode');
      });
    });
  })
})();
