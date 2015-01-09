"use strict";

(function () {
  "use strict";

  angular.module("unacademic.content.course", []).controller("CourseCtrl", CourseCtrl);

  function CourseCtrl(courseResolver, $scope, dispatcher, data, navHelpers, formHelpers) {
    var vm = this;
    initialize();

    function initialize() {
      vm.info = data.course;
      vm.cards = data.waypoints;
      vm.form = {};
      vm.schema = data.schema;

      vm.learn = viewProps().learn;
      vm.curate = viewProps().curate;
      vm.goTo = _.bind(navHelpers.goTo, null, "waypoints.detail");
      // test
      vm.goBack = navHelpers.goBack;
      vm.submit = function () {
        return formHelpers.submit(vm.form, vm.info);
      };

      var checkForm = function () {
        return formHelpers.checkForm(vm.form, vm.info.id);
      };
      $scope.$watch("vm.info", checkForm, true);

      dispatcher.registerObserverCallback(updateInfo);
    }

    function updateInfo() {
      courseResolver().then(function (_ref) {
        var course = _ref.course;
        var waypoints = _ref.waypoints;
        vm.info = course;
        vm.cards = waypoints;
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
            return goTo();
          }
        }, {
          type: "button",
          title: "Back",
          onClick: function () {
            return vm.goBack();
          }
        }, {
          type: "submit",
          title: "Save" }]
      };
    }
  };
})();