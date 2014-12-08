angular.module('unacademic').directive('card', function(){
  return {
    templateUrl: 'card.html',
    restrict: 'E',
    replace: true,
    scope: {
      card: '='
    }
    // controller: function($scope){
    //   $scope.getTemplateUrl = function(){
    //     var template;
    //     if($scope.model instanceof Path){
    //       template = 'pathCard.tpl.html';
    //     } else {
    //       template = 'card.tpl.html';
    //     }

    //     return template;
    //   }

    //   $scope.remove = function(){
    //     alert("YOOOOOHOOO");
    //   }
    // }
  }

});
