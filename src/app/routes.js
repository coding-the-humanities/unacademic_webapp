(function(){
  var app = angular.module('unacademic');

  app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/paths/index');
  });

})();
