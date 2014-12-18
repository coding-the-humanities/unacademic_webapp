(function(){
  var app = angular.module('unacademic.common.tracker', [
    'unacademic.common.permission',
    'unacademic.common.currentUser'
  ]);

  app.factory('appState', appState);

  function appState($log, permission, currentUser){
    var modes = ['browsing', 'learning', 'curation'];
    var mode = 'browsing';
    var switchable = false;
    var observerCallbacks = [];

    return {
      getMode: getMode,
      setMode: setMode,
      go: go,
      canSwitch: canSwitch,
      registerObserverCallback: registerObserverCallback
    }

    function getMode(){
      return mode;
    }

    function setMode(newMode){
      var state = {
        currentMode: mode,
        nextMode: newMode,
        user: currentUser.getId(),
        switchable: switchable
      }

      if(!_.contains(modes, newMode)){
        $log.warn('invalid appmode');
        return false;
      }


      if(!permission(state)){
        return false
      }

      mode = newMode;
      notifyObservers();
      return true;
    }

    function go(path){

      if(!path){
        $log.warn('you cannot transition without specifying the route');
        return false;
      }

      if(!canSwitch()){
        $log.warn('not allowed to transition now');
        return false;
      }


      $log.log(path);
      return true;
    }

    function canSwitch(flag){

      var state = {
        currentMode: mode,
        user: currentUser.getId(),
        switchable: switchable
      }

      if(flag !== undefined){
        switchable = flag;
      }

      return switchable;
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
