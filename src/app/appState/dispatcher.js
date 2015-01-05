"use strict";

(function () {
  "use strict";

  angular.module("unacademic.appState.dispatcher", []).factory("dispatcher", dispatcher);

  function dispatcher($log, queue, view, currentUser, mode, permission, $state, resource) {
    var observerCallbacks = [];
    var modules = [mode, currentUser, view, resource, queue];

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
      var changed = false;
      var currentState = get();
      var proposedState = createNextState(currentState, proposedChanges);
      var approvedChanges = permission.get(proposedState, currentState);

      if (_.isEmpty(approvedChanges)) {
        return false;
      }

      setServicesState(approvedChanges);
      notifyObservers();

      var state = get();
      $log.log(state);

      return true;
    }

    // TODO: separate service

    function changeRoute(name, resource) {
      if (resource) {
        (function () {
          var routeName = name || get().name;
          var modelName = routeName.replace(/s\..+/, "") + "Id";

          var params = (function (_params) {
            _params[modelName] = "" + resource;
            return _params;
          })({});
          $state.go(routeName, params);
        })();
      }

      if (name && !resource) {
        $state.go(name);
      }
    }



    function setServicesState(changes) {
      if (changes.user) {
        currentUser.set(changes.user);
      }

      if (changes.mode) {
        mode.set(changes.mode);
      }

      if (changes.name) {
        view.set(changes.name);
      }

      if (changes.resource) {
        resource.set(changes.resource);
      }

      if (changes.name || changes.resource) {
        changeRoute(changes.name, changes.resource);
      };
    }

    function createNextState(currentState, changes) {
      var state = _.clone(currentState);
      var params = ["user", "mode", "name", "resource"];

      _.each(params, function (param) {
        if (changes[param]) {
          state[param] = changes[param];
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