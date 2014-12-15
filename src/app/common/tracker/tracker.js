(function(){
  var app = angular.module('unacademic.common.tracker', []);

  app.factory('appState', appState);

  function appState($log){
    var modes = ['learning', 'curation'];
    var mode = 'learning';
    var switchable = true;
    var currentUserId;

    return {
      getMode: getMode,
      setMode: setMode,
      canSwitch: canSwitch,
      getCurrentUserId: getCurrentUserId,
      setCurrentUserId: setCurrentUserId
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
      setPermissions(mode, newMode);
      mode = newMode;
      return true;
    }

    function setPermissions(oldMode, newMode){
      if(oldMode === 'learning' && newMode === 'curation'){
        canSwitch(false);
      }
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
    }
  };
})();
