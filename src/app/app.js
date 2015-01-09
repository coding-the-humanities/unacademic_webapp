(function(){
  var app = angular.module('unacademic', [
    'ui.router',
    'templates-app',
    'schemaForm',
    'contenteditable',
    'unacademic.common',
    'unacademic.appState',
    'unacademic.sidebar',
    'unacademic.models',
    'unacademic.courses'
  ]);

  /*@ngInject*/
  app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/courses/index');
  });

  app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com/');
  //app.constant('baseUrl', 'http://private-7c8dd-unacademic.apiary-mock.com');

  app.run(function($state, $rootScope, switcher, history, dispatcher) {
    initialize();

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      $state.go('courses.index');
    });

    function initialize(){
      switcher.initialize();
      history.initialize();

      dispatcher.setState({
        name: 'courses.index',
        mode: 'browsing'
      });

      window.backlog = history.get;
    }
  });
})();
