(function(){
  var app = angular.module('unacademic', [
    'ui.router',
    'templates-app',
    'schemaForm',
    'contenteditable',
    'unacademic.common',
    'unacademic.sidebar',
    'unacademic.models',
    'unacademic.courses'
  ]);

  /*@ngInject*/
  app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/courses/index');
  });

  app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com/');

  app.run(function($state, $rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      $state.go('courses.index'); 
    });
  });

  //app.constant('baseUrl', 'http://private-7c8dd-unacademic.apiary-mock.com');


})();
