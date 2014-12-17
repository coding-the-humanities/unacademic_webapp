(function(){

  describe("tracker", function(){
    var permission;
    var $log;

    beforeEach(function(){
      module('unacademic.common.permission');
      inject(function(_permission_, _$log_){
        permission = _permission_;
        $log = _$log_;
      });
    });

    it("is prevents unauthorized switching in curation mode", function(){
      expect(permission.set('learning', 'curation')).to.be.false;
    });

    it("is allows switching in learning mode", function(){
      expect(permission.set('curation', 'learning')).to.be.true;
    });
  })
})();
