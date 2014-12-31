"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  child.__proto__ = parent;
};

(function () {
  angular.module("unacademic.models.path", []).factory("Path", PathInit);

  function PathInit(BaseClass, schema, initData) {
    var Path = (function (BaseClass) {
      var Path = function Path() {
        BaseClass.apply(this, arguments);
      };

      _extends(Path, BaseClass);

      return Path;
    })(BaseClass);

    Path.initialize({ schema: schema, initData: initData });

    return Path;
  };
})();