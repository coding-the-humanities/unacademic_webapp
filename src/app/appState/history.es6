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
       state.timestamp = Date.now();
       backlog.push(state);
       // log(state);
    }

    /* function save(state){ */
    /*   var url = generateUrl(baseUrl, state); */
    /*   $http.put(url, state) */
    /*   handleBacklog(backlog, state) */
    /* } */

    /* function handleBacklog(backlog, state){ */
    /*   if(backlog.length > 0){ */
    /*     _.each(backlog, (entry) => { */
    /*       entry.user = state.user; */
    /*       var url = generateUrl(baseUrl, entry); */
    /*       $http.put(url, entry) */
    /*     }); */
    /*     backlog = []; */
    /*   } */
    /* } */

    /* function log(state){ */
    /*   $log.log(state) */
    /* } */

    /* function generateUrl(baseUrl, entry){ */
    /*   return `${baseUrl}/history/${entry.user}/${entry.timestamp}.json`; */
    /* } */
  }
})();
