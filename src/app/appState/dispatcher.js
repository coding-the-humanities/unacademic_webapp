"use strict";

(function () {
  "use strict";

  angular.module("unacademic.appState.dispatcher", []).factory("dispatcher", dispatcher);

  function dispatcher(currentState, queue, permission, switcher) {
    var observerCallbacks = [];

    return {
      getState: get,
      setState: set,
      queue: setQueue,
      registerObserverCallback: registerObserverCallback
    };

    function get() {
      var state = currentState.get();
      state.queue = queue.get();
      return state;
    }

    function set(proposedChanges) {
      var _currentState = get();
      var proposal = createProposal(_currentState, proposedChanges);
      var approvedChanges = permission.get(proposal, _currentState);

      if (!_.isEmpty(approvedChanges)) {
        switcher.set(approvedChanges).then(function (msg) {
          setServicesState(approvedChanges);
          notifyObservers(approvedChanges);
        })["catch"](function (err) {});
      }
    }

    function setServicesState(changes) {
      currentState.set(changes);
    }

    function createProposal(currentState, changes) {
      var modules = ["mode", "name", "user", "resource"];
      var state = _.clone(currentState);

      _.each(modules, function (module) {
        if (changes[module]) {
          state[module] = changes[module];
        }
      });
      return state;
    }

    function setQueue(options) {
      return queue.set(options);
    }

    function registerObserverCallback(callback) {
      observerCallbacks.push(callback);
    }

    function notifyObservers(msg) {
      _.each(observerCallbacks, function (callback) {
        callback(msg);
      });
    };
  };
})();