(function(){

  'use strict';

  angular.module('unacademic.courses.services.resolvers', [])
        .factory('resolvers', resolvers);

  function resolvers($q, CoverInfo, Course, dispatcher){

    return {
      index: index,
      detail: detail
    }

    function detail(){
      let schema = Course.schema;
      let userId = dispatcher.getState().resource.curator;
      let courseId = dispatcher.getState().resource.id;
      let promises;

      return $q(function(resolve, reject){

        if(!userId){
          return reject();
        }

        if(userId && courseId === 'new'){
          let course = new Course();
          return resolve({schema: schema, course: course});
        }

        promises = [
          Course.get(userId, courseId)
        ];

        $q.all(promises).then(function(data){
          let course = data[0];
          return resolve({schema: schema, course: course});
        });
      });
    }

    function index(){
      let userId = dispatcher.getState().user || 'general';
      let promises;

      return $q(function(resolve, reject){
        promises = [
          CoverInfo.get(userId, 'info'),
          Course.getAll(userId)
        ];

        $q.all(promises).then(function(data){
          let coverInfo = data[0];
          let courses = data[1];
          let schema = CoverInfo.schema;
          return resolve({coverInfo, schema, courses});
        });
      });
    }
  }
})();
