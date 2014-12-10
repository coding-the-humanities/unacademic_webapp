var app = angular.module('unacademic', [
  'ui.router',
  'ActiveResource',
  'templates-app',
  'unacademic.modules',
  'famous.angular',
  'contenteditable'
])

app.value('tracker', {mode: 'learning', path: ''});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('paths', {
      url: '/paths',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('paths.new', {
      url: '/new',
      controller: 'NewPath as newPath',
      templateUrl: 'paths/views/newPath.html'
    })
    .state('paths.details', {
      url: '/:pathId',
      controller: 'PathDetails as pathDetails',
      templateUrl: 'paths/views/pathDetails.html',
      resolve: {
        path: function(Path, $stateParams){
          return Path.find($stateParams.pathId);
        }
      },
    })
    .state('points', {
      url: '/points',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('points.new', {
      url: '/new',
      controller: 'newPoint as newPoint',
      templateUrl: 'points/views/pointDetails.html'
    });
  $urlRouterProvider.otherwise('/paths/coding_the_humanities');
});
