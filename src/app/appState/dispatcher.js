"use strict";

(function () {
  "use strict";

  angular.module("unacademic.common.dispatcher", []).factory("dispatcher", dispatcher);

  function dispatcher($log, queue, currentUser, mode, permission, $state, $stateParams) {
    var observerCallbacks = [];

    return {
      getState: get,
      setState: set,
      queue: setQueue,
      registerObserverCallback: registerObserverCallback
    };

    function get() {
      // build wrapper around $state and $stateParams

      var params = $stateParams;
      var keys = _.keys(params);
      var resource = params[keys[0]];

      // ...

      var state = {
        mode: mode.get(),
        user: currentUser.getId(),
        name: $state.current.name,
        resource: resource,
        queue: queue.get() };


      // return a promise

      return state;
    }

    function set(_ref) {
      var user = _ref.user;
      var path = _ref.path;
      var nextMode = _ref.mode;
      var name = _ref.name;
      var resource = _ref.resource;


      // return a promise

      var approvedChanges;
      var changed = false;

      var currentState = get();
      var nextState = createNextState(currentState, user, nextMode, name, resource);

      approvedChanges = permission.get(nextState, currentState);

      if (_.isEmpty(approvedChanges)) {
        return false;
      }

      setServicesState(approvedChanges);

      _.each(approvedChanges, function (value, key) {
        $log.info("switched from " + currentState[key] + " to " + nextState[key]);
      });

      notifyObservers();

      var state = get();
      $log.log(state);

      return true;
    }

    // Tests are missing things

    function createNextState(currentState, user, nextMode, name, resource) {
      var state = _.clone(currentState);

      if (user) {
        state.user = user;
      }

      if (nextMode) {
        state.mode = nextMode;
      }

      if (name) {
        state.name = name;
      }

      if (resource) {
        state.resource = resource;
      }

      return state;
    }

    function setServicesState(_ref2) {
      var user = _ref2.user;
      var name = _ref2.name;
      var nextMode = _ref2.mode;
      var resource = _ref2.resource;
      // return promise

      if (user) {
        currentUser.setId(user);
      }

      if (nextMode) {
        mode.set(nextMode);
      }

      // build wrapper around $state ....


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

      // ...
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