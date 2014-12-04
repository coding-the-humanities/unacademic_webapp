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
    templateUrl: 'paths/views/pathsList.html',
    controller: 'PathsList as pathsList',
    resolve: {
      paths: function(Path){
        return Path.all()
      }
    }
  })
  .state('path', {
    url: '/path',
    templateUrl: 'paths/views/pathDetails.html',
    controller: 'PathDetails as pathDetails',
    resolve: {
      path: function(Path){
        return Path.find(1);
      }
    }
  })
  .state('newPath', {
    url: '/newPath',
    templateUrl: 'paths/views/newPath.html',
    controller: 'NewPath as newPath',
    resolve: {
      path: function(Path){
        var path = Path.new({title: "new path", curator: "yeehaa", version: "0.0.0"});
        path.creating = true;
        return path;
      }
    }
  });
  $urlRouterProvider.otherwise('/');
});
