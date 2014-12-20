(function(){
  var app = angular.module('unacademic.common.mode', [
  ]);

  app.factory('mode', mode);

  function mode($log){
    var mode = 'browsing';

    return {
      get: get,
      set: set,
    }

    function get(){
      return mode;
    }

    function set(nextMode){
      mode = nextMode;
    }
  };
})();
