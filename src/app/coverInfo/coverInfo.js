"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

(function () {
  var app = angular.module("unacademic.models", []);

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  app.factory("CoverInfo", function (baseUrl, $http, $q, appState) {
    var $http = $http;

    var Model = (function () {
      var Model = function Model(options) {
        this.title = options.title;
        this.curator = appState.get().user;
        this.summary = options.summary;
        this.description = options.description;
      };

      Model.prototype.save = function () {
        Model._save(this);
      };

      Model.get = function (userId) {
        return $http.get(baseUrl + "/coverInfo/" + userId + ".json").then(Model.extractData);
      };

      Model.extractData = function (response) {
        return $q(function (resolve, reject) {
          var coverInfo = new Model(response.data);
          resolve(coverInfo);
        });
      };

      Model._save = function (coverInfo) {
        return $http.put(coverInfo.url, coverInfo);
      };

      Model.schema = function () {
        return {
          type: "object",
          properties: {
            title: {
              type: "string",
              required: true,
              minLength: 5,
              maxLength: 25

            },
            summary: {
              type: "string"
            },
            description: {
              type: "string"
            }
          }
        };
      };

      Model.seed = function () {
        var coverInfo = {
          title: "ReAcademic",
          summary: "Learning by Dwelling",
          description: description,
          paths: ["hello"]
        };

        return Model.save(coverInfo, "general");
      };

      _classProps(Model, null, {
        url: {
          get: function () {
            return baseUrl + "/coverInfo/" + this.curator + ".json";
          }
        }
      });

      return Model;
    })();

    return Model;
  });
})();