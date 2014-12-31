"use strict";

(function () {
  "use strict";

  angular.module("unacademic.models.baseClass", []).factory("BaseClass", initBaseClass);

  function initBaseClass($http, $q, DataStore, dispatcher) {
    var BaseClass = (function () {
      var BaseClass = function BaseClass(data) {
        var _this = this;
        var schema = this.constructor.schema;
        var props = _.keys(schema.properties);
        _.each(props, function (prop) {
          _this[prop] = data[prop];
        });
      };

      BaseClass.prototype.save = function () {
        if (!this.curator) {
          this.curator = "123";
        }
        return DataStore.save(this);
      };

      BaseClass.get = function (userId) {
        var extractData = _.bind(_extractData, this);

        return DataStore.get(this.name, userId).then(extractData);
      };

      BaseClass.initialize = function (_ref) {
        var schema = _ref.schema;
        var initData = _ref.initData;
        this.schema = schema;
        this.initData = initData;
      };

      return BaseClass;
    })();

    function _extractData(data) {
      if (data) {
        return new this(data);
      }
      return new this(this.initData);
    };

    return BaseClass;
  };
})();