"use strict";

(function () {
  "use strict";

  angular.module("unacademic.courses.controllers.detail", []).controller("Detail", Detail);

  function Detail(resolvers, $scope, dispatcher, data, formHelpers) {
    var vm = this;
    initialize();

    function initialize() {
      vm.info = data.course;
      vm.cards = data.waypoints;
      vm.form = {};
      vm.schema = data.schema;

      vm.learn = viewProps().learn;
      vm.curate = viewProps().curate;
      vm.goToWaypoint = goToWaypoint;
      vm.submit = function () {
        return formHelpers.submit(vm.form, vm.info);
      };

      var checkForm = function () {
        return formHelpers.checkForm(vm.form, vm.info.id);
      };
      $scope.$watch("vm.info", checkForm, true);

      dispatcher.registerObserverCallback(updateInfo);
    }

    function goToWaypoint(resource) {
      if (!resource) {
        resource = createNewResource();
      }

      dispatcher.setState({
        name: "waypoints.detail",
        resource: {
          id: resource.id,
          curator: resource.curator
        }
      });
    }

    function createNewResource() {
      return {
        id: "new",
        curator: dispatcher.getState().user
      };
    }

    function updateInfo() {
      resolvers.detail().then(function (_ref) {
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
            return goToWaypoint();
          }
        }, {
          type: "submit",
          title: "Save" }]
      };
    }
  };
})();