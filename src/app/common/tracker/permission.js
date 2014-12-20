"use strict";

(function () {
  var app = angular.module("unacademic.common.permission", []);

  app.factory("permission", permission);

  function permission($log) {
    var modes = ["browsing", "learning", "curation"];

    return {
      get: get
    };

    function get(_ref) {
      var nextMode = _ref.nextMode;
      var mode = _ref.mode;
      var user = _ref.user;


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

      $log.log("switched from " + mode + " to " + nextMode);
      return true;
    }
  }
})();