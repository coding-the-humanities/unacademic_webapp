"use strict";

(function () {
  var app = angular.module("unacademic.models.baseClass", []);

  app.factory("BaseClass", function ($http, $q, DataStore) {
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

      BaseClass.initialize = function (_ref) {
        var schema = _ref.schema;
        var initData = _ref.initData;
        this.schema = schema;
        this.initData = initData;
      };

      BaseClass.get = function (userId) {
        var extractData = _.bind(_extractData, this);

        return DataStore.get(this.name, userId).then(extractData);


        function _extractData(data) {
          if (data) {
            return new this(data);
          }
          return new this(this.initData);
        };
      };

      return BaseClass;
    })();

    return BaseClass;
  });
})();