"use strict";

(function () {
  "use strict";

  angular.module("unacademic.sidebar.controller", []).controller("Sidebar", Sidebar);

  function Sidebar(dispatcher, navHelpers) {
    var sidebar = this;
    var modes = ["browsing", "learning", "curation"];
    var currentMode;
    initialize();

    function initialize() {
      var state = dispatcher.getState();
      currentMode = state.mode;
      initSidebar(state);
      dispatcher.registerObserverCallback(updateAppState);
    }

    function initSidebar(_ref) {
      var mode = _ref.mode;
      var user = _ref.user;
      sidebar.modes = modes;
      sidebar.user = user;
      sidebar.mode = mode;
      sidebar.back = back;
      sidebar.forward = forward;
      sidebar.signIn = signIn;
      sidebar.checkMode = checkMode;
    }

    function back() {
      navHelpers.goBack();
    }

    function forward() {
      navHelpers.goForward();
    }

    function signIn() {
      var users = ["yeehaa", "marijn", "reika", "peter"];
      var user = _.sample(users);
      return dispatcher.setState({ user: user, mode: "learning" });
    }

    function checkMode(newMode) {
      sidebar.mode = currentMode;
      dispatcher.setState({ mode: newMode });
    }

    function updateAppState(_ref2) {
      var user = _ref2.user;
      var mode = _ref2.mode;
      if (user) {
        sidebar.user = user;
      }

      if (mode) {
        currentMode = mode;
        sidebar.mode = mode;
      }
    }
  }
})();