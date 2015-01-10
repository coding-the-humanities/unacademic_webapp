"use strict";

(function () {
  "use strict";

  angular.module("unacademic.content.course").factory("courseResolver", courseResolver);

  function courseResolver($q, Course, dispatcher) {
    return data;

    function data() {
      var schema = Course.schema;
      var curatorId = dispatcher.getState().resource.curator;
      var courseId = dispatcher.getState().resource.id;
      var promises;

      return $q(function (resolve, reject) {
        if (!curatorId) {
          return reject();
        }

        if (curatorId && courseId === "new") {
          var course = new Course();
          return resolve({ schema: schema, course: course });
        }

        promises = [Course.get(curatorId, courseId)];

        $q.all(promises).then(function (data) {
          var course = data[0];
          return resolve({ schema: schema, course: course });
        });
      });
    }
  }
})();