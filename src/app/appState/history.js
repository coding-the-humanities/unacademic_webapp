"use strict";

(function () {
  "use strict";

  angular.module("unacademic.appState.history", []).factory("history", history);

  function history(dispatcher) {
    var _history;
    var index = 0;

    return {
      initialize: initialize,
      get: get,
      previous: previous,
      next: next
    };

    function next() {
      if (index > 0) {
        index -= 1;
      }
      return _history[index];
    }

    function previous() {
      if (index < _history.length - 1) {
        index += 1;
      }
      return _history[index];
    }

    function get() {
      return _history;
    }

    function initialize() {
      _history = [];
      dispatcher.registerObserverCallback(updateHistory);
    }

    function updateHistory() {
      var state = dispatcher.getState();

      if (!state.timestamp) {
        _history = shortenHistory(_history);
        state.timestamp = Date.now();
        _history.unshift(state);
        index = 0;
      }
      console.log(index);
    }

    function shortenHistory(history) {
      return _history.slice(index, _history.length);
    }
  }
})();


// move to separate service

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