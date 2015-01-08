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
      let params = {};
      $state.go(name, resource)
    }
  }
})();
