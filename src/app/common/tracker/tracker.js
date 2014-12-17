(function(){
  var app = angular.module('unacademic.common.tracker', [
    'unacademic.common.permission'
  ]);

  app.factory('appState', appState);

  function appState($log, permission){

    // third mode: browsing
    var modes = ['learning', 'curation'];

    // default mode: browsing
    var mode = 'learning';

    // to permission
    var switchable = true;

    // ==> userPresent + observer
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

      if(!_.contains(modes, newMode)){
        $log.warn('invalid appmode');
        return false;
      }

      // replace with permission.get()
      if(!canSwitch()){
        $log.warn('not allowed to switch now');
        return false
      }

      if(!getCurrentUserId()){
        $log.warn('no user logged in');
        return false
      }

      mode = newMode;
      // permission.set({oldMode: oldMode, newMode: newMode})
      canSwitch(permission.set(mode, newMode));
      notifyObservers();
      return true;
    }

    function go(path){
      // replace with permission.get()
      if(!canSwitch()){
        $log.warn('not allowed to transition now');
        return false;
      }

      if(!path){
        $log.warn('you cannot transition without specifying the route');
        return false;
      }

      $log.log(path);
      return true;
    }

    // to permission.set
    function canSwitch(flag){
      if(flag !== undefined){
        switchable = flag;
      }
      // permission.get();
      return switchable;
    }

    // seperate module

    function getCurrentUserId(){
      return currentUserId;
    }

    function setCurrentUserId(userId){
      currentUserId = userId;
      notifyObservers();
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
