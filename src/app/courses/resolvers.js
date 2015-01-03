"use strict";

(function () {
  angular.module("unacademic.courses").factory("resolvers", resolvers);

  function resolvers($q, CoverInfo, Course, dispatcher, $stateParams) {
    return {
      index: index,
      details: details
    };

    function details(courseId) {
      var userId = dispatcher.getState().user;
      var schema = Course.schema;

      return $q(function (resolve, reject) {
        var course;

        if (userId && courseId === "new") {
          var course = new Course();
          $stateParams.courseId = course.id;
          resolve({ schema: schema, course: course });
        }

        if (userId) {
          Course.get(userId, courseId).then(function (data) {
            course = data;
            resolve({ schema: schema, course: course });
          });
        } else {
          reject();
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