(function () {
  var app = angular.module("unacademic.common.permission", []);

  app.factory("permission", permission);

  function permission($log) {
    return get;

    function get({user, nextMode, currentMode, switchable}) {

      if(!user){
        $log.warn('curation and learning mode are only accessible after signing in')
        return false;
      }

      if(nextMode === 'browsing'){
        $log.warn('browsing mode is not available for logged in users')
        return false;
      }

      if(currentMode === 'curation' && nextMode === 'learning'){
        if(!switchable){
          $log.warn('unsaved changes that prevent mode switch...')
          return false;
        }
        return true;
      }

      return true;
    }
  }
})();
