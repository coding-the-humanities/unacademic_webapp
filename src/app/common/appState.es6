(function(){
  var app = angular.module('unacademic.common.appState', [
    'unacademic.common.currentUser',
    'unacademic.common.mode',
    'unacademic.common.permission'
  ]);

  app.factory('appState', appState);

  function appState($log, currentUser, mode, permission){

    return {
      get: get,
      set: set
    }

    function set({user, newMode}){
      var changed = false;
      var state = get();
      var switchable;

      state.user = user;
      state.mode = newMode;
      switchable = permission.get(state);

      if(!switchable){
        return false;
      }

      if(newMode){
        mode.set(newMode);
        changed = true;
      }

      if(user){
        currentUser.setId(user);
        changed = true
      }

      return changed;
    }

    function get(){
      var state = {
        mode: mode.get(),
        user: currentUser.getId()
      }

      $log.log(state);
      return state;
    }
  };
})();
