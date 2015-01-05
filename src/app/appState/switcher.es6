(() => {

  'use strict';

  angular.module('unacademic.appState.switcher', [])
         .factory('switcher', switcher);

  function switcher($state, dispatcher){
    return {
      initialize: initialize
    };

    function initialize(){
      dispatcher.registerObserverCallback(updateState);
    }

    function updateState(){
      let state = dispatcher.getState();
      switchState(state);
    }

    function switchState({name, resource}){
      if(resource){
        let routeName = name;
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
  }
})();
