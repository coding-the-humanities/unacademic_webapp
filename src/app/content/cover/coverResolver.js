"use strict";

(function () {
  "use strict";

  angular.module("unacademic.content.cover").factory("coverResolver", coverResolver);

  function coverResolver($q, CoverInfo, Course, dispatcher) {
    return data;

    function data() {
      var userId = dispatcher.getState().user;
      var promises;

      var coverUser = userId || "general";

      return $q(function (resolve, reject) {
        promises = [CoverInfo.get(coverUser, "info"), Course.getAll(userId)];

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