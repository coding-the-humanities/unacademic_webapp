(function(){
  var app = angular.module('unacademic.common.tracker', []);

  app.factory('appState', appState);

  function appState($log){
    var modes = ['learning', 'curation'];
    var mode = 'learning';
    var switchable = true;
    var currentUserId;
    var observerCallbacks = [];

    return {
      getMode: getMode,
      setMode: setMode,
      go: go,
      canSwitch: canSwitch,
      getCurrentUserId: getCurrentUserId,
      setCurrentUserId: setCurrentUserId,
      registerObserverCallback: registerObserverCallback
    }

    function getMode(){
      return mode;
    }

    function setMode(newMode){
      if(!switchable){
        $log.warn('not allowed to switch now');
        return false
      }
      if(!currentUserId){
        $log.warn('no user logged in');
        return false
      }

      if(!_.contains(modes, newMode)){
        $log.warn('invalid appmode');
        return false;
      }
      setPermission(mode, newMode);
      mode = newMode;
      return true;
    }

    function go(path){
      if(!switchable){
        $log.warn('not allowed to transition now');
        return false
      }

      if(!path){
        $log.warn('you cannot transition without specifying the route');
        return false;
      }

      $log.log(path);
      return true;
    }

    function canSwitch(flag){
      if(flag !== undefined){
        switchable = flag;
      }
      return switchable;
    }

    function getCurrentUserId(){
      return currentUserId;
    }

    function setCurrentUserId(userId){
      currentUserId = userId;
      notifyObservers();
      return true;
    }

    function setPermission(oldMode, newMode){
      if(newMode === 'curation'){
        switchable = false;
      }
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
