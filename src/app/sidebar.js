angular.module('unacademic').directive('sidebar', function(){
  return {
    templateUrl: 'sidebar.html',
    replace: true,
    scope: {
      model: '=',
      mode: '='
    },
    controller: function($scope, $state){
      $scope.buttonText = 'Save';
      $scope.save = save;
      $scope.add = add;

      function add(){
        $state.go('paths/coding_the_humanities/waypoints/new')
      }

      function save(){
        $scope.buttonText = 'Pending';
        if(!$scope.model.id){
          $scope.model.id = $scope.model.title.split(' ').join('_').toLowerCase();
        }
        $scope.model.$update().then(function(response){
          $scope.mode = 'learning';
          $scope.buttonText = 'Save';
        });
      }
    }
  }
});
