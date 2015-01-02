(function(){
  var app = angular.module('unacademic.courses');


  /*@ngInject*/

  app.config(function($stateProvider) {
    $stateProvider

      .state('courses', {
        url: '/courses',
        abstract: true,
        template: '<ui-view/>'
      })

      .state('courses.index', {
        url: '/index',
        controller: 'Index',
        controllerAs: 'vm',
        templateUrl: 'courses/views/index.html',
        resolve: {
          data: function(resolvers){
            return resolvers.index();
          },
        }
      })

      .state('courses.details', {
        url: '/details/:courseId',
        controller: 'New',
        controllerAs: 'vm',
        templateUrl: 'courses/views/index.html',
        resolve: {
          course: function(resolvers, $stateParams){
            var courseId = $stateParams.courseId;
            return resolvers.details(courseId);
          }
        }
      })
  });

})();
