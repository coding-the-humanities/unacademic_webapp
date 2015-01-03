"use strict";

(function () {
  "use strict";

  angular.module("unacademic.courses.controllers.index", []).controller("Index", Index);

  function Index(resolvers, $scope, dispatcher, data) {
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
      vm.submit = submit;

      dispatcher.registerObserverCallback(updateInfo);
      $scope.$watch("vm.info", checkForm, true);
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

    function submit() {
      var form = vm.form;

      if (form.$dirty && form.$valid) {
        form.$setPristine();
        vm.info.save().then(success, error);
      }

      function success() {
        dispatcher.queue({ remove: vm.info.id });
      }

      function error() {
        form.$setDirty();
        dispatcher.queue({ add: vm.info.id });
      }
    }

    function checkForm(newVal, oldVal) {
      var form = vm.form;

      if (form.$dirty) {
        dispatcher.queue({ add: vm.info.id });
      }
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