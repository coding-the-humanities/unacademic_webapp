(function(){
  var app = angular.module('unacademic', [
    'ui.router',
    'templates-app',
    'schemaForm',
    'contenteditable',
    'unacademic.common',
    'unacademic.sidebar',
    'unacademic.models',
    'unacademic.paths',
    'unacademic.points'
  ]);

  /*@ngInject*/
  app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/paths/index');
  });

  app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com/');

  //app.constant('baseUrl', 'http://private-7c8dd-unacademic.apiary-mock.com');

})();
