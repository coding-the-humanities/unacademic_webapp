(() => {

  'use strict';

  angular.module('unacademic.common.dispatcher', [])
         .factory('dispatcher', dispatcher);

  function dispatcher($log, queue, currentUser, mode, permission, $state, $stateParams){
    let observerCallbacks = [];

    return {
      getState: get,
      setState: set,
      queue: setQueue,
      registerObserverCallback: registerObserverCallback
    }

    function get(){
      let params = $stateParams;
      let keys = _.keys(params);
      let resource = params[keys[0]];

      let state = {
        mode: mode.get(),
        user: currentUser.getId(),
        name: $state.current.name,
        resource: resource,
        queue: queue.get(),
      }
      return state;
    }

    function set({user, path, mode:nextMode, name, resource}){
   
      let approvedChanges;
      let changed = false;

      let currentState = get();
      let nextState = createNextState(currentState, user, nextMode, name, resource);

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

    // Tests are missing things
    function createNextState(currentState, user, nextMode, name, resource){
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

      if(resource){
        state.resource = resource;
      }

      return state;
    }

    function setServicesState({user, name, mode:nextMode, resource}){
      let params;

      if(user){
        currentUser.setId(user);
      }

      // build wrapper around $state ....
      if(resource){
        console.log(resource);
        let routeName = name || get().name;
        let modelName = routeName.replace(/s\..+/, '') + "Id"
        console.log(routeName);

        params = {
          [modelName]: "" + resource
        }
      }

      if(name){
        $state.go(name, params)
      }
      // ...

      if(nextMode){
        mode.set(nextMode);
      }
    }

    function setQueue(options){
      return queue.set(options);
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
