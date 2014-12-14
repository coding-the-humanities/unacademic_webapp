(function(){
  var app = angular.module('unacademic');

  /*@ngInject*/
  app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/paths/index');
  });

})();
