"use strict";

(function () {
  var app = angular.module("unacademic.common.appState", ["unacademic.common.currentUser", "unacademic.common.mode", "unacademic.common.permission"]);

  app.factory("appState", appState);

  function appState($log, currentUser, mode, permission, $state) {
    var observerCallbacks = [];

    return {
      get: get,
      set: set,
      registerObserverCallback: registerObserverCallback
    };

    function get() {
      var state = {
        mode: mode.get(),
        user: currentUser.getId(),
        name: $state.current.name
      };

      return state;
    }

    function set(_ref) {
      var user = _ref.user;
      var path = _ref.path;
      var nextMode = _ref.mode;
      var switchable = false;
      var changed = false;

      var currentState = get();
      var nextState = createNextState(currentState, user, nextMode);

      switchable = permission.get(currentState, nextState);

      if (!switchable) {
        return false;
      }

      changed = setServicesState(nextState);

      if (!changed) {
        return false;
      }

      $log.log(nextState);
      return true;
    }

    function createNextState(state, user, nextMode) {
      if (user) {
        state.user = user;
      }

      if (nextMode) {
        state.mode = nextMode;
      }

      return state;
    }

    function setServicesState(_ref2) {
      var user = _ref2.user;
      var nextMode = _ref2.mode;
      var modified = false;

      mode.set(nextMode);
      currentUser.setId(user);
      notifyObservers();

      return modified;
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