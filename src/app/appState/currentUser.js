(function(){

  'use strict';

  angular.module('unacademic.appState.currentUser', [])
         .factory('currentUser', currentUser);

  function currentUser($log){

    var currentUserId;

    var observerCallbacks = [];

    return {
      name: 'user',
      get: get,
      set: set,
    }

    function get(){
      return currentUserId;
    }

    function set(userId){
      currentUserId = userId;
      return true;
    }
  };
})();
