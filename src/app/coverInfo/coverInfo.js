"use strict";

(function () {
  var app = angular.module("unacademic.models", ["unacademic.DS"]);

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  app.factory("CoverInfo", function (baseUrl, $http, $q, DS, appState) {
    var $http = $http;

    var CoverInfo = (function () {
      var CoverInfo = function CoverInfo(_ref) {
        var title = _ref.title;
        var summary = _ref.summary;
        var description = _ref.description;
        this.title = title;
        this.curator = appState.get().user;
        this.summary = summary;
        this.description = description;
      };

      CoverInfo.prototype.save = function () {
        DS.save(this);
      };

      CoverInfo.get = function (userId) {
        return DS.get("CoverInfo", userId).then(CoverInfo.createInstance);
      };

      CoverInfo.createInstance = function (data) {
        var coverInfo;

        return $q(function (resolve, reject) {
          if (data) {
            coverInfo = new CoverInfo(data);
          } else {
            coverInfo = new CoverInfo(CoverInfo.seed());
          }

          resolve(coverInfo);
        });
      };

      CoverInfo.schema = function () {
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

      CoverInfo.seed = function () {
        return {
          title: "ReAcademic",
          summary: "Learning by Dwelling",
          description: description,
          paths: ["hello"]
        };
      };

      return CoverInfo;
    })();

    return CoverInfo;
  });
})();