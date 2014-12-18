(function(){

  describe("appState", function(){
    var appState;
    var $log;
    var mockUser;
    var mockPermission;

    beforeEach(function(){

      var mode = {
        get: function(){}
      };

      var currentUser = {
        setId: function(){},
        getId: function(){}
      };

      mockMode = sinon.mock(mode);
      mockPermission = sinon.mock(permission);

      module('unacademic.common.appState',  function($provide){
        $provide.value('mode', mode);
        $provide.value('currentUser', currentUser);
      });

      inject(function(_appState_, _$log_){
        appState = _appState_;
        $log = _$log_;
      });
    });
  });
})();
