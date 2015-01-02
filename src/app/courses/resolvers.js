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

      return $q(function (resolve, reject) {
        if (userId && courseId === "new") {
          var course = new Course();
          $stateParams.courseId = course.id;
          resolve(course);
        }

        if (userId) {
          var course = Course.get(userId, courseId);
          resolve(course);
        }

        reject();
      });
    }

    function index() {
      return $q(function (resolve, reject) {
        var userId = dispatcher.getState().user || "general";
        var promises = [CoverInfo.get(userId, "info"), Course.getAll(userId)];

        $q.all(promises).then(function (data) {
          var coverInfo = data[0];
          var courses = data[1];
          resolve({ coverInfo: coverInfo, courses: courses });
        });
      });
    }
  }
})();