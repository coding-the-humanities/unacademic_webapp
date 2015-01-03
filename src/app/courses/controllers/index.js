"use strict";

(function () {
  "use strict";


  angular.module("unacademic.courses.controllers.index", []).controller("Index", Index);

  function Index(resolvers, $scope, dispatcher, data, formHelpers) {
    var vm = this;
    initialize();

    function initialize() {
      vm.info = data.coverInfo;
      vm.form = {};
      vm.courses = data.courses;
      vm.schema = data.schema;
      vm.learn = viewProps().learn;
      vm.curate = viewProps().curate;

      vm.goToCourse = goToCourse;

      vm.submit = function () {
        _.bind(formHelpers.submit, null, vm.form, vm.info)();
      };

      var _checkForm = function () {
        _.bind(formHelpers.checkForm, null, vm.form, vm.info.id);
      };

      dispatcher.registerObserverCallback(updateInfo);
      $scope.$watch("vm.info", _checkForm, true);
    }

    function goToCourse(id) {
      if (!id) {
        id = "new";
      }

      dispatcher.setState({
        name: "courses.detail",
        resource: id
      });
    }

    function updateInfo() {
      resolvers.index().then(function (_ref) {
        var coverInfo = _ref.coverInfo;
        var courses = _ref.courses;
        vm.info = coverInfo;
        vm.courses = courses;
      });
    }

    function viewProps() {
      return {
        learn: ["summary", "description"],
        curate: [{
          key: "title" }, {
          key: "summary" }, {
          key: "description",
          type: "textarea" }, {
          type: "button",
          title: "Add New Course",
          onClick: function () {
            goToCourse();
          }
        }, {
          type: "submit",
          title: "Save" }]
      };
    }
  };
})();