(() => {

  'use strict';

  angular.module('unacademic.appState.dispatcher', [])
         .factory('dispatcher', dispatcher)

  function dispatcher(queue, view, user, mode, permission, resource){
    let modules = [mode, user, view, resource, queue];
    let observerCallbacks = [];

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
      let currentState = get();
      let proposal = createProposal(currentState, proposedChanges);
      let approvedChanges = permission.get(proposal, currentState);

      if(approvedChanges){
        setServicesState(approvedChanges);
        notifyObservers();
      }
    }

    function setServicesState(changes){
      _.each(modules, (module) => {
        if(changes[module.name]){
          module.set(changes[module.name]);
        }
      });
    }

    function createProposal(currentState, changes){
      let state = _.clone(currentState);

      _.each(modules, (module) => {
        if(changes[module.name]){
          state[module.name] = changes[module.name];
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
