"use strict";

(function () {
  var app = angular.module("unacademic.common.appState", ["unacademic.common.currentUser", "unacademic.common.mode", "unacademic.common.permission"]);

  app.factory("appState", appState);

  function appState($log, currentUser, mode, permission) {
    var observerCallbacks = [];

    return {
      get: get,
      set: set,
      registerObserverCallback: registerObserverCallback
    };

    function set(_ref) {
      var user = _ref.user;
      var nextMode = _ref.nextMode;
      var changed = false;
      var state = get();
      var switchable;

      if (user) {
        state.user = user;
      }

      if (nextMode) {
        state.nextMode = nextMode;
      }

      state.nextMode = nextMode;

      switchable = permission.get(state);

      if (!switchable) {
        return false;
      }

      if (nextMode) {
        mode.set(nextMode);
        changed = true;
      }

      if (user) {
        currentUser.setId(user);
        changed = true;
      }

      if (!changed) {
        return false;
      }

      notifyObservers();
      return true;
    }

    function get() {
      var state = {
        mode: mode.get(),
        user: currentUser.getId()
      };

      $log.log(state);
      return state;
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