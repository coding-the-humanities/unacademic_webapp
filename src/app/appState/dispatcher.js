"use strict";

(function () {
  "use strict";

  angular.module("unacademic.appState.dispatcher", []).factory("dispatcher", dispatcher);

  function dispatcher(queue, view, user, mode, permission, resource) {
    var modules = [mode, user, view, resource, queue];
    var observerCallbacks = [];

    return {
      getState: get,
      setState: set,
      queue: setQueue,
      registerObserverCallback: registerObserverCallback
    };

    function get() {
      var state = {};

      _.each(modules, function (module) {
        state[module.name] = module.get();
      });

      return state;
    }

    function set(proposedChanges) {
      var currentState = get();
      var proposal = createProposal(currentState, proposedChanges);
      var approvedChanges = permission.get(proposal, currentState);

      if (approvedChanges) {
        setServicesState(approvedChanges);
        notifyObservers();
      }
    }

    function setServicesState(changes) {
      _.each(modules, function (module) {
        if (changes[module.name]) {
          module.set(changes[module.name]);
        }
      });
    }

    function createProposal(currentState, changes) {
      var state = _.clone(currentState);

      _.each(modules, function (module) {
        if (changes[module.name]) {
          state[module.name] = changes[module.name];
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

    function notifyObservers() {
      _.each(observerCallbacks, function (callback) {
        callback();
      });
    };
  };
})();