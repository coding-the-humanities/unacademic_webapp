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

        if (!this.curator) {
          this.curator = dispatcher.getState().user;
        }
      };

      BaseClass.prototype.save = function () {
        var _this2 = this;


        var schema = this.constructor.schema;
        var props = _.keys(schema.properties);

        var required = _.select(props, required);
        var valid = true;

        _.each(required, function (field) {
          valid = !_this2[field] ? false : valid;
        });

        if (valid) {
          var model = JSON.stringify(this);
          return DataStore.save(this);
        }

        return $q.reject();
      };

      BaseClass.getAll = function (userId) {
        var extractObjects = _.bind(_extractObjects, this);
        return DataStore.get(this.name, userId).then(extractObjects);
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

    function getAllProps() {
      var schema = this.constructor.schema;
      var props = _.keys(schema.properties);
    }

    function _extractObjects(data) {
      var _this3 = this;
      if (data) {
        var keys = _.keys(data);
        return _.map(keys, function (key) {
          return new _this3(data[key]);
        });
      }
    };

    function _extractData(data) {
      if (data) {
        return new this(data);
      }
      return new this(this.initData);
    };

    return BaseClass;
  };
})();