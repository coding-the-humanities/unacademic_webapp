(() => {

  'use strict';

  angular.module('unacademic.appState.dispatcher', [])
         .factory('dispatcher', dispatcher)

  function dispatcher(currentState, queue, permission, mutator){
    let observerCallbacks = [];

    return {
      getState: get,
      setState: set,
      queue: setQueue,
      registerObserverCallback: registerObserverCallback
    }

    function get(){
      return currentState.get();
    }

    function set(proposals){
      let state = get();
      state.queue = queue.get();

      let changes = permission.get(state, proposals);

      if(!_.isEmpty(changes)){
        mutator.set(changes).then((data) => { notifyObservers(data); });
      }
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
