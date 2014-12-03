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
    templateUrl: 'paths/views/paths.html',
    controller: 'PathsList as pathsList',
    resolve: {
      paths: function(Path){
        return Path.all()
      }
    }
  })
  .state('path', {
    url: '/path',
    templateUrl: 'paths/views/path.html',
    controller: 'PathDetails as pathDetails',
    resolve: {
      path: function(Path){
        return Path.find(1);
      }
    }
  })
  .state('newPath', {
    url: '/newPath',
    templateUrl: 'paths/views/path.html',
    controller: 'PathDetails as pathDetails',
    resolve: {
      path: function(Path){
        return Path.new({name: "new path", curator: "yeehaa", version: "0.0.0"});
      }
    }
  });
  $urlRouterProvider.otherwise('/');
});
