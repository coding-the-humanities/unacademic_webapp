"use strict";

(function () {
  "use strict";

  angular.module("unacademic.appState.switcher", []).factory("switcher", switcher);

  function switcher($state, dispatcher) {
    return {
      initialize: initialize
    };

    function initialize() {
      dispatcher.registerObserverCallback(updateState);
    }

    function updateState() {
      var state = dispatcher.getState();
      switchState(state);
    }

    function switchState(_ref) {
      var name = _ref.name;
      var resource = _ref.resource;
      $state.go(name, resource);
    }
  }
})();