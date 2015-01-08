"use strict";

(function () {
  "use strict";

  angular.module("unacademic.courses.services.resolvers", []).factory("resolvers", resolvers);

  function resolvers($q, CoverInfo, Course, dispatcher) {
    return {
      index: index,
      detail: detail
    };

    function detail() {
      var schema = Course.schema;
      var userId = dispatcher.getState().resource.curator;
      var courseId = dispatcher.getState().resource.id;
      var promises;

      return $q(function (resolve, reject) {
        if (!userId) {
          return reject();
        }

        if (userId && courseId === "new") {
          var course = new Course();
          return resolve({ schema: schema, course: course });
        }

        promises = [Course.get(userId, courseId)];

        $q.all(promises).then(function (data) {
          var course = data[0];
          return resolve({ schema: schema, course: course });
        });
      });
    }

    function index() {
      var userId = dispatcher.getState().user || "general";
      var promises;

      return $q(function (resolve, reject) {
        promises = [CoverInfo.get(userId, "info"), Course.getAll(userId)];

        $q.all(promises).then(function (data) {
          var coverInfo = data[0];
          var courses = data[1];
          var schema = CoverInfo.schema;
          return resolve({ coverInfo: coverInfo, schema: schema, courses: courses });
        });
      });
    }
  }
})();