"use strict";

(function () {
  "use strict";

  angular.module("unacademic.courses.services.resolvers", []).factory("resolvers", resolvers);

  function resolvers($q, CoverInfo, Course, dispatcher) {
    return {
      index: index,
      detail: detail
    };

    function detail(id) {
      var userId = dispatcher.getState().user;
      var schema = Course.schema;
      var courseId = id || dispatcher.getState().resource;

      return $q(function (resolve, reject) {
        if (!userId) {
          reject();
        }

        if (userId && courseId === "new") {
          var course = new Course();
          resolve({ schema: schema, course: course });
        }

        if (userId && courseId !== "new") {
          Course.get(userId, courseId).then(function (data) {
            var course = data;
            resolve({ schema: schema, course: course });
          });
        }
      });
    }

    function index() {
      return $q(function (resolve, reject) {
        var userId = dispatcher.getState().user || "general";
        var promises = [CoverInfo.get(userId, "info"), Course.getAll(userId)];

        $q.all(promises).then(function (data) {
          var coverInfo = data[0];
          var courses = data[1];
          var schema = CoverInfo.schema;
          resolve({ coverInfo: coverInfo, schema: schema, courses: courses });
        });
      });
    }
  }
})();