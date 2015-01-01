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
          coverInfo: function(CoverInfo, dispatcher){
            var id = dispatcher.getState().user || 'general';
            return CoverInfo.get(id)
          },
          courses: function(Course, dispatcher){
            var id = dispatcher.getState().user || 'general';
            return Course.getAll(id)
          },
        }
      })

      .state('courses.details', {
        url: '/details',
        controller: 'New',
        controllerAs: 'vm',
        templateUrl: 'courses/views/index.html',
        resolve: {
          course: function($q, Course, dispatcher, utilities, $state){
            return $q(function(resolve, reject){
              var userId = dispatcher.getState().user;
              var id = utilities.generateUID().toString();
              if(userId){
                var course = new Course({curator: userId, id: id});
                resolve(course);
              } else {
                reject();
              }
            });
          }
        }
      })

      // .state('paths.details', {
      //   url: '/:pathId',
      //   controller: 'CourseDetails',
      //   controllerAs: 'pathDetails',
      //   templateUrl: 'paths/views/pathDetails.html',
      //   resolve: {
      //     path: function(Course, $stateParams){
      //       return Course.find($stateParams.pathId);
      //     }
      //   },
      // })

  });

})();
