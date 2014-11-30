var app = angular.module('unacademic', [
  'ui.router',
  'ActiveResource',
  'templates-app',
  'unacademic.modules',
])

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/',
    templateUrl: 'paths/views/paths.tpl.html',
    controller: 'Paths as paths',
    resolve: {
      allPaths: function(Path){
        return Path.all()
      }
    }
  })
  .state('path', {
    url: '/path',
    templateUrl: 'paths/views/path.tpl.html',
    controller: 'Path as path',
    resolve: {
      onePath: function(Path){
        return Path.find(1);
      }
    }
  });
  $urlRouterProvider.otherwise('/');
});
