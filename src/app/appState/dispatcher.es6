(() => {

  'use strict';

  angular.module('unacademic.common.dispatcher', [])
         .factory('dispatcher', dispatcher);

  function dispatcher($log, lock, currentUser, mode, permission, $state){
    let observerCallbacks = [];

    return {
      getState: get,
      setState: set,
      registerObserverCallback: registerObserverCallback
    }

    function get(){
      return {
        mode: mode.get(),
        user: currentUser.getId(),
        name: $state.current.name,
        lock: lock.getState()
      }
    }

    function set({user, path, mode:nextMode, name, lock:lockState}){
      let approvedChanges;
      let changed = false;

      let currentState = get();
      let nextState = createNextState(currentState, user, nextMode, name, lockState);

      approvedChanges = permission.get(nextState, currentState);

      if(_.isEmpty(approvedChanges)){
        return false;
      }

      setServicesState(approvedChanges);

      _.each(approvedChanges, function(value, key){
        $log.info(`switched from ${currentState[key]} to ${nextState[key]}`);
      });

      notifyObservers();

      let state = get();
      $log.log(state);
      return true;
    }

    function createNextState(currentState, user, nextMode, name, lockState){
      let state = _.clone(currentState);

      if(user){
        state.user = user;
      }

      if(nextMode){
        state.mode = nextMode;
      }

      if(name){
        state.name = name;
      }

      if(lockState){
        state.lock = lockState;
      }

      return state;
    }

    function setServicesState({user, name, mode:nextMode, lock:lockState}){
      if(user){
        currentUser.setId(user);
      }

      if(name){
        $state.go(name)
      }

      if(nextMode){
        mode.set(nextMode);
      }

      if(lockState){
        lock.setState(lockState);
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
