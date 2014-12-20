(function () {
  var app = angular.module("unacademic.common.permission", [
  ]);

  app.factory("permission", permission);

  function permission($log) {
    var modes = ['browsing', 'learning', 'curation'];

    return {
      get: get
    }

    function get(currentState, nextState) {

      if(!_.contains(modes, nextState.mode)){
        $log.warn('invalid appmode');
        return false;
      }

      if(!nextState.user){
        $log.warn('curation and learning mode are only accessible after signing in')
        return false;
      }

      if(nextState.mode === 'browsing'){
        $log.warn('browsing mode is not available for logged in users')
        return false;
      }

      $log.log(`switched from ${currentState.mode} to ${nextState.mode}`);
      return true;
    }
  }
})();
