"use strict";

(function () {
  var app = angular.module("unacademic.DS", []);

  app.factory("DS", DS);


  function DS(baseUrl, $http, $q) {
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
      return $http.put(url);
    }

    function extractData(response) {
      return $q(function (resolve, reject) {
        var data = response.data;
        resolve(data);
      });
    }

    function generateUrl(modelName, userId) {
      var resourceName = generateResourceName(modelName);
      return baseUrl + "/" + resourceName + "/" + userId + ".json";
    }

    function generateResourceName(modelName) {
      return modelName.substr(0, 1).toLowerCase() + modelName.substr(1);
    }
  }
})();