(function () {
  var app = angular.module("unacademic.common.permission", [
  ]);

  app.factory("permission", permission);

  function permission($log) {
    var modes = ['browsing', 'learning', 'curation'];

    return {
      get: get
    }

    function get(nextState, currentState) {
      var valid = checkPermissions(currentState, nextState);

      if(!valid){
        return false;
      }

      var intersection =  _.omit(nextState, function(value, key){
        return currentState[key] === value;
      });


      delete intersection.queue;

      if(intersection.lock === 'closed'){
        return {lock: 'closed'};
      }

      return intersection;
    }

    function checkPermissions(currentState, nextState){

      if(nextState.queue.size > 0){
        $log.warn('app is locked');
        return false;
      }

      if(!_.contains(modes, nextState.mode)){
        $log.warn('invalid appmode');
        return false;
      }

      if((nextState.mode === 'curation' || nextState.mode === 'learning') && !nextState.user){
        $log.warn('curation and learning mode are only accessible after signing in')
        return false;
      }

      if(nextState.mode === 'browsing' && nextState.user){
        $log.warn('browsing mode is not available for logged in users')
        return false;
      }

      return true;
    }
  }
})();
