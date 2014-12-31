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
  angular.module("unacademic.models.path", ["unacademic.models.path.initData", "unacademic.models.path.schema"]).factory("Path", PathInit);

  function PathInit(BaseClass, pathSchema, pathInitData) {
    var Path = (function (BaseClass) {
      var Path = function Path() {
        BaseClass.apply(this, arguments);
      };

      _extends(Path, BaseClass);

      return Path;
    })(BaseClass);

    Path.initialize({ schema: pathSchema, initData: pathInitData });

    return Path;
  };
})();