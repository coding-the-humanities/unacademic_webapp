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
        controllerAs: 'vm',
        templateUrl: 'paths/views/index.html',
        resolve: {
          coverInfo: function(CoverInfo, dispatcher){
            var id = dispatcher.getState().user || 'general';
            return CoverInfo.get(id)
          },
          paths: function(Path, dispatcher){
            var id = dispatcher.getState().user || 'general';
            return Path.getAll(id)
          },
        }
      })

      .state('paths.new', {
        url: '/new',
        controller: 'New',
        controllerAs: 'vm',
        templateUrl: 'paths/views/index.html',
        resolve: {
          path: function($q, Path, dispatcher, utilities, $state){
            return $q(function(resolve, reject){
              var userId = dispatcher.getState().user;
              var id = utilities.generateUID().toString();
              if(userId){
                var path = new Path({curator: userId, id: id});
                resolve(path);
              } else {
                reject();
              }
            });
          }
        }
      })

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
