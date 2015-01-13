(() => {

  'use strict';

  angular.module('unacademic.appState.dispatcher', [])
         .factory('dispatcher', dispatcher)

  function dispatcher(currentState, queue, permission, switcher){
    let observerCallbacks = [];

    return {
      getState: get,
      setState: set,
      queue: setQueue,
      registerObserverCallback: registerObserverCallback
    }

    function get(){
      var state = currentState.get();
      state.queue = queue.get();
      return state;
    }

    function set(proposedChanges){
      let currentState = get();
      let proposal = createProposal(currentState, proposedChanges);
      let approvedChanges = permission.get(proposal, currentState);

      if(!_.isEmpty(approvedChanges)){
        switcher.set(approvedChanges).then(function(msg){
          setServicesState(approvedChanges);
          notifyObservers(approvedChanges);
        }).catch(function(err){
          // set(proposedChanges);
        });
      }
    }

    function setServicesState(changes){
      currentState.set(changes);
    }

    function createProposal(currentState, changes){
      let modules = ["mode", "name", "user", "resource"]
      let state = _.clone(currentState);

      _.each(modules, (module) => {
        if(changes[module]){
          state[module] = changes[module];
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

    function notifyObservers(msg){
      _.each(observerCallbacks, function(callback){
        callback(msg);
      });
    };
  };
})();
