"use strict";

(function () {
  "use strict";


  angular.module("unacademic.content.cover").controller("CoverCtrl", CoverCtrl);

  function CoverCtrl(coverResolver, $scope, dispatcher, data, navHelpers, formHelpers) {
    var vm = this;
    initialize();

    function initialize() {
      vm.info = data.coverInfo;
      vm.cards = data.courses;
      vm.form = {};
      vm.schema = data.schema;

      vm.learn = viewProps().learn;
      vm.curate = viewProps().curate;
      vm.goTo = _.bind(navHelpers.goTo, null, "course");
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
      coverResolver().then(function (_ref) {
        var coverInfo = _ref.coverInfo;
        var courses = _ref.courses;
        vm.info = coverInfo;
        vm.cards = courses;
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
            return vm.goTo();
          }
        }, {
          type: "submit",
          title: "Save" }]
      };
    }
  };
})();