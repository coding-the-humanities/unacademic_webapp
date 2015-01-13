(function(){
  'use strict';

  angular.module('unacademic.appState.currentState.timestamp', [])
         .factory('timestamp', timestamp);

  function timestamp(){

    let time;

    return {
      name: 'name',
      get: get,
      set: set
    }

    function get(){
      return time;
    }

    function set(newTime){
      time = newTime;
      return true;
    }
  };
})();
