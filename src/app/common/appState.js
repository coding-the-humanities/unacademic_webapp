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
      var name = _ref.name;
      var ready = _ref.ready;
      var approvedChanges;
      var changed = false;

      var currentState = get();
      var nextState = createNextState(currentState, user, nextMode, name);

      approvedChanges = permission.get(currentState, nextState);

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

    function createNextState(currentState, user, nextMode, name) {
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

      return state;
    }

    function setServicesState(_ref2) {
      var user = _ref2.user;
      var name = _ref2.name;
      var nextMode = _ref2.mode;


      if (user) {
        currentUser.setId(user);
      }

      if (name) {
        $state.go(name);
      }

      if (nextMode) {
        mode.set(nextMode);
      }
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