var app = angular.module('unacademic', [
  'ui.router',
  'ActiveResource',
  'templates-app',
  'unacademic.modules',
  'famous.angular',
  'contenteditable'
])

app.value('tracker', {mode: 'learning', path: ''});

app.service('generateId', function(){
  function generateId(model){
    var version = model.version.split(".").join("_");
    return parameterize(model.curator) + "_" + parameterize(model.title);
  }

  function parameterize(string){
    return string.toLowerCase().split(' ').join("_");
  }

  return generateId;
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('paths', {
      url: '/paths',
      abstract: true,
      template: '<ui-view/>'
    })

    .state('paths.new', {
      url: '/new',
      controller: 'NewPath',
      controllerAs: 'newPath',
      templateUrl: 'paths/views/newPath.html'
    })

    .state('paths.index', {
      url: '/index',
      controller: 'PathsIndex',
      controllerAs: 'pathsIndex',
      templateUrl: 'paths/views/pathsIndex.html',
      resolve: {
        paths: function(Path){
          return Path.all();
        }
      }
    })

    .state('paths.details', {
      url: '/:pathId',
      controller: 'PathDetails',
      controllerAs: 'pathDetails',
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
      controller: 'NewPoint',
      controllerAs: 'newPoint',
      templateUrl: 'points/views/pointDetails.html'
    });

  $urlRouterProvider.otherwise('/paths/index');
});
