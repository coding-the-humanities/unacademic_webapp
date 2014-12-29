"use strict";

(function () {
  angular.module("unacademic.common.queue", []).factory("queue", queue);

  function queue($log) {
    var queue = new Set();

    return {
      get: get,
      set: set };

    function get() {
      return queue;
    }

    function set(_ref) {
      var add = _ref.add;
      var remove = _ref.remove;


      if (add && remove) {
        $log.warn("it is not possible to add and remove at the same time");
        return false;
      }

      if (add) {
        queue.add(add);
      }

      if (remove) {
        queue["delete"](remove);
      }

      return true;
    }
  };
})();