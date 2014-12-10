angular.module('unacademic').directive('sidebar', function(){
  return {
    templateUrl: 'sidebar/sidebar.html',
    replace: true,
    scope: {
      model: '=',
      mode: '=',
      actions: '='
    }
  }
});
