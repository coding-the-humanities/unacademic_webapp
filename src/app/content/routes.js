(function(){
  var app = angular.module('unacademic.content');

  /*@ngInject*/

  app.config(function($stateProvider) {
    $stateProvider

      .state('cover', {
        url: '/cover',
        controller: 'CoverCtrl',
        controllerAs: 'vm',
        templateUrl: 'content/views/index.html',
        resolve: {
          data: function(coverResolver){
            return coverResolver();
          },
        }
      })

      .state('course', {
        url: '/course/:curator/:id',
        controller: 'CourseCtrl',
        controllerAs: 'vm',
        templateUrl: 'content/views/index.html',
        resolve: {
          data: function(courseResolver){
            return courseResolver();
          }
        }
      })
  });
})();
