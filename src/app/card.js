angular.module('unacademic').directive('card', function(){
  return {
    template: '<div class="card" ng-include src="getTemplateUrl()"></div>',
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    controller: function($scope){
      $scope.getTemplateUrl = function(){
        var template;
        if($scope.model instanceof Path){
          template = 'pathCard.tpl.html';
        } else {
          template = 'card.tpl.html';
        }

        return template;
      }

      $scope.remove = function(){
        alert("YOOOOOHOOO");
      }
    }
  }

});
