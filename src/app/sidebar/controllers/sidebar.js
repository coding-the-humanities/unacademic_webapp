"use strict";

(function () {
  "use strict";

  angular.module("unacademic.sidebar.controller", []).controller("Sidebar", Sidebar);

  function Sidebar($scope, dispatcher, navHelpers) {
    var sidebar = this;
    var modelId;
    var users = ["yeehaa", "marijn", "reika", "peter"];
    var user;
    var currentMode = "browsing";
    initialize();

    function initialize() {
      user = _.sample(users);
      sidebar.user = undefined;
      sidebar.modes = ["browsing", "learning", "curation"];
      sidebar.mode = currentMode;
      sidebar.back = back;
      sidebar.forward = forward;
      sidebar.signIn = signIn;
      sidebar.checkMode = checkMode;
      dispatcher.registerObserverCallback(updateAppState);
    }

    function back() {
      navHelpers.goBack();
    }

    function forward() {
      navHelpers.goForward();
    }

    function signIn() {
      return dispatcher.setState({ user: user, mode: "learning" });
    }

    function checkMode(newMode) {
      sidebar.mode = currentMode;
      return dispatcher.setState({ mode: newMode });
    }

    function updateAppState(_ref) {
      var user = _ref.user;
      var mode = _ref.mode;
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