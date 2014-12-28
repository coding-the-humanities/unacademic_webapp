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
  var app = angular.module("unacademic.models.coverInfo", []);

  app.factory("CoverInfo", CoverInfoInit);

  function CoverInfoInit(BaseClass, schema, initData) {
    var CoverInfo = (function (BaseClass) {
      var CoverInfo = function CoverInfo() {
        BaseClass.apply(this, arguments);
      };

      _extends(CoverInfo, BaseClass);

      return CoverInfo;
    })(BaseClass);

    CoverInfo.initialize({ schema: schema, initData: initData });

    return CoverInfo;
  };
})();