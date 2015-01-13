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
      let changes = permission.get(currentState, proposedChanges);

      if(!_.isEmpty(changes)){
        switcher.set(changes).then(function(){
          setServicesState(changes);
          notifyObservers(changes);
        }).catch(function(err){
          // set(proposedChanges);
        });
      }
    }

    function setServicesState(changes){
      currentState.set(changes);
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
