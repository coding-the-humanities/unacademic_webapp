"use strict";

(function () {
  var app = angular.module("unacademic.appState.resource", []);
  app.factory("resource", resource);

  function resource($stateParams) {
    var name;

    return {
      name: "resource",
      get: get,
      set: set
    };

    function get() {
      var params = $stateParams;
      var keys = _.keys(params);
      var defaultName = params[keys[0]];
      return name = name || defaultName;
    }

    function set(newName) {
      name = newName;
      return true;
    }
  };
})();