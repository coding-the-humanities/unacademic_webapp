(() => {

  'use strict';

  angular.module('unacademic.appState.dispatcher', [])
         .factory('dispatcher', dispatcher);

  function dispatcher($log, queue, view, currentUser, mode, permission, $state, resource){
    let observerCallbacks = [];
    let modules = [mode, currentUser, view, resource, queue];

    return {
      getState: get,
      setState: set,
      queue: setQueue,
      registerObserverCallback: registerObserverCallback
    }

    function get(){
      let state = {};

      _.each(modules, (module) => {
         state[module.name] = module.get();
      });

      return state;
    }

    function set(proposedChanges){
      let changed = false;
      let currentState = get();
      let proposedState = createNextState(currentState, proposedChanges);
      let approvedChanges = permission.get(proposedState, currentState);

      if(_.isEmpty(approvedChanges)){
        return false;
      }

      setServicesState(approvedChanges);
      notifyObservers();

      let state = get();
      $log.log(state);

      return true;
    }

    // TODO: separate service

    function changeRoute(name, resource){
      if(resource){
        let routeName = name || get().name;
        let modelName = routeName.replace(/s\..+/, '') + "Id"

          let params = {
            [modelName]: "" + resource
          }
        $state.go(routeName, params)
      }

      if(name && !resource){
        $state.go(name)
      }
    }



    function setServicesState(changes){

      if(changes.user){
        currentUser.set(changes.user);
      }

      if(changes.mode){
        mode.set(changes.mode);
      }

      if(changes.name){
        view.set(changes.name);
      }

      if(changes.resource){
        resource.set(changes.resource);
      }

      if(changes.name || changes.resource){
        changeRoute(changes.name, changes.resource);
      };
    }

    function createNextState(currentState, changes){
      let state = _.clone(currentState);
      let params = ["user", "mode", "name", "resource"]

      _.each(params, (param) => {
        if(changes[param]){
          state[param] = changes[param];
        }
      });

      return state;
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
