(() => {

  'use strict';

  angular.module('unacademic.appState.history', [])
         .factory('history', history);

  function history(dispatcher, $log){

    let backlog = [];

    return {
      initialize: initialize,
      get: get
    };

    function get(){
      return backlog;
    }

    function initialize(){
      dispatcher.registerObserverCallback(updateHistory);
    }

    function updateHistory(){
       var state = dispatcher.getState();
       backlog.push(state);
       // log(state);
    }

    function log(state){
      $log.log(state)
    }
  }
})();
