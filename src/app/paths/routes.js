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



      .state('paths.index', {
        url: '/index',
        controller: 'Index',
        controllerAs: 'index',
        templateUrl: 'paths/views/index.html'
      })

      // .state('paths.new', {
      //   url: '/new',
      //   controller: 'PathDetails',
      //   controllerAs: 'newPath',
      //   templateUrl: 'paths/views/newPath.html',
      //   resolve: {
      //     path: function(Path, $stateParams){
      //       return Path.new();
      //     }
      //   },
      // })

      // .state('paths.details', {
      //   url: '/:pathId',
      //   controller: 'PathDetails',
      //   controllerAs: 'pathDetails',
      //   templateUrl: 'paths/views/pathDetails.html',
      //   resolve: {
      //     path: function(Path, $stateParams){
      //       return Path.find($stateParams.pathId);
      //     }
      //   },
      // })

  });

})();
