(function(){
  var app = angular.module('unacademic.sidebar', [])

  app.directive('sidebar', sidebar);

  function sidebar(){
    return {
      templateUrl: 'sidebar/sidebar.html',
      replace: true,
      scope: {
        model: '=',
        actions: '='
      },
      controllerAs: 'sidebar',
      controller: function($scope, tracker){
        var vm = this;

        vm.model = $scope.model;
        vm.actions = $scope.actions;

        vm.mode = tracker.mode;
        vm.user = tracker.user;

        vm.signIn = function(){
          vm.user = tracker.user = "yeehaa";
        }
      }
    }
  };
})();
