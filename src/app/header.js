angular.module('unacademic').directive('navBar', function(){
  return {
    templateUrl: 'nav-bar.tpl.html',
    scope: {
      actions: '='
    }
  }
});
