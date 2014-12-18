(function(){
  var app = angular.module('unacademic.common.appState', [
    'unacademic.common.permission',
    'unacademic.common.currentUser'
  ]);

  app.factory('appState', appState);

  function appState($log, currentUser){

    return {
      check: check,
    }

    function check(nextMode){
      var state = {
        currentMode: mode,
        nextMode: nextMode || '',
        user: currentUser.getId(),
        switchable: switchable
      }

      $log.log(state);
      return state;
    }
  };
})();
