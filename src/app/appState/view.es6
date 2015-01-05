(function(){
  'use strict';

  angular.module('unacademic.appState.view', [])
         .factory('view', view);

  function view($state){

    let name;

    return {
      name: 'view',
      get: get,
      set: set
    }

    function get(){
      let defaultName = $state.current.name;
      return name = name || defaultName;
    }

    function set(newName){
      name = newName;
      return true;
    }
  };
})();
