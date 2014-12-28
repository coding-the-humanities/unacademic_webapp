"use strict";

(function () {
  var app = angular.module("unacademic.DataStore", []);

  app.factory("DataStore", DataStore);


  function DataStore(baseUrl, $http, $q) {
    return {
      get: get,
      save: save
    };

    function get(modelName, userId) {
      var url = generateUrl(modelName, userId);
      return $http.get(url).then(extractData);
    }

    function save(instance) {
      var url = generateUrl(instance.constructor.name, instance.curator);
      return $http.put(url, instance);
    }

    function extractData(response) {
      return $q(function (resolve, reject) {
        var data = response.data;
        resolve(data);
      });
    }

    function generateUrl(modelName, userId) {
      var resourceName = generateResourceName(modelName);
      var url = baseUrl + "/" + resourceName + "/" + userId + ".json";
      return url;
    }

    function generateResourceName(modelName) {
      return modelName.substr(0, 1).toLowerCase() + modelName.substr(1);
    }
  }
})();