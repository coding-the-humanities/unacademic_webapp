"use strict";

(function () {
  var app = angular.module("unacademic.common.permission", []);

  app.factory("permission", permission);

  function permission($log, appState) {
    var modes = ["browsing", "learning", "curation"];

    return {
      get: get
    };

    function get(_ref) {
      var nextMode = _ref.nextMode;
      var currentMode = _ref.currentMode;


      var state = appState.get();

      var user = state.user;
      var currentMode = state.mode;
      var switchable = state.switchable || false;

      if (!_.contains(modes, nextMode)) {
        $log.warn("invalid appmode");
        return false;
      }

      if (!user) {
        $log.warn("curation and learning mode are only accessible after signing in");
        return false;
      }

      if (nextMode === "browsing") {
        $log.warn("browsing mode is not available for logged in users");
        return false;
      }

      if (currentMode === "curation" && nextMode === "learning") {
        if (!switchable) {
          $log.warn("unsaved changes that prevent mode switch...");
          return false;
        }
        $log.log("switched from " + currentMode + " to " + nextMode);
        return true;
      }

      $log.log("switched from " + currentMode + " to " + nextMode);
      return true;
    }
  }
})();