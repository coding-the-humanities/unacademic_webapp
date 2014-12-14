(function(){
  var app = angular.module('unacademic.paths');


  /*@ngInject*/
  app.config(function($stateProvider) {
    $stateProvider

      .state('paths', {
        url: '/paths',
        abstract: true,
        template: '<ui-view/>'
      })

      .state('paths.new', {
        url: '/new',
        controller: 'PathDetails',
        controllerAs: 'newPath',
        templateUrl: 'paths/views/newPath.html',
        resolve: {
          path: function(Path, $stateParams){
            return Path.new();
          }
        },
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

  });

})();
