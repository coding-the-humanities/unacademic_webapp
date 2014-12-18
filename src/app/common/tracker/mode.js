(function(){
  var app = angular.module('unacademic.common.mode', [
    'unacademic.common.permission',
    'unacademic.common.appState'
  ]);

  app.factory('mode', mode);

  function mode($log, permission, appState){
    var mode = 'browsing';
    var switchable = false;
    var observerCallbacks = [];

    return {
      get: get,
      set: set,
      canSwitch: canSwitch,
      registerObserverCallback: registerObserverCallback
    }

    function get(){
      return mode;
    }

    function set(newMode){
      if(getPermission(newMode)){
        mode = newMode;
        notifyObservers();
        return true;
      }
      return false
    }

    function canSwitch(flag){
      if(flag !== undefined){
        switchable = flag;
      }

      return switchable;
    }

    function getPermission(newMode){
      var state = appState.check(newMode);

      if(!permission.get(state)){
        return false
      }
      return true;
    }

    function registerObserverCallback(callback){
      observerCallbacks.push(callback);
    }

    function notifyObservers(){
      _.each(observerCallbacks, function(callback){
        callback();
      });
    };
  };
})();
