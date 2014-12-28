"use strict";

(function () {
  angular.module("unacademic.models.baseClass", []).factory("BaseClass", initBaseClass);

  function initBaseClass($http, $q, DataStore) {
    var BaseClass = (function () {
      var BaseClass = function BaseClass(data) {
        var _this = this;
        var schema = this.constructor.schema;
        var keys = _.keys(schema.properties);
        _.each(keys, function (key) {
          _this[key] = data[key];
        });
      };

      BaseClass.prototype.save = function () {
        DataStore.save(this);
      };

      BaseClass.get = function (userId) {
        var extractData = _.bind(this.extractData, this);

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

    BaseClass.extractData = function (data) {
      if (data) {
        return new this(data);
      }
      return new this(this.initData);
    };

    return BaseClass;
  };
})();