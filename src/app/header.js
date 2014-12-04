angular.module('unacademic').directive('navBar', function(){
  return {
    templateUrl: 'nav-bar.tpl.html',
    scope: {
      actions: '=',
      mode: '='
    },
    controller: function($scope){
      console.log($scope.mode);
    }
  }
});
