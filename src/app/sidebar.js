angular.module('unacademic').directive('sidebar', function(){
  return {
    templateUrl: 'sidebar.html',
    replace: true,
    scope: {
      model: '=',
      tracker: '='
    },
    controller: function($scope, $state){
      $scope.buttonText = 'Save';
      $scope.save = save;
      $scope.add = add;
      $scope.mode = $scope.tracker.mode;
      $scope.done = done;

      function add(){
        $scope.tracker.path = $state.params.pathId;
        $state.go('points.new')
      }

      function save(){
        var model = $scope.model;
        if(!model.id){
          model.id = generateId(model);
        }
        model.$update().then(function(response){
          $scope.mode = 'learning';
          $scope.buttonText = 'Save';
        });
      }

      function done(){
        var pathId = $scope.tracker.path;
        $scope.tracker.path = '',
        $state.go('paths.details', {pathId: pathId});
      }

      function generateId(model){
        var version = model.version.split(".").join("_");
        return parameterize(model.curator) + "_" + parameterize(model.title);
      }

      function parameterize(string){
        return string.toLowerCase().split(' ').join("_");
      }
    }
  }
});
