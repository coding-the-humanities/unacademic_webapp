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
      let userId = dispatcher.getState().user;
      let courseId = dispatcher.getState().resource;
      let schema = Course.schema;

      return $q(function(resolve, reject){

        if(!userId){
          reject();
        }

        if(userId && courseId === 'new'){
          let course = new Course(); 
          resolve({schema: schema, course: course});
        }

        if(userId && courseId !== 'new'){
          Course.get(userId, courseId).then(function(data){
            let course = data;
            resolve({schema: schema, course: course});
          });
        }
      });
    }

    function index(){

      return $q(function(resolve, reject){
        let userId = dispatcher.getState().user || 'general';
        let promises = [
          CoverInfo.get(userId, 'info'),
          Course.getAll(userId)
        ];

        $q.all(promises).then(function(data){
          let coverInfo = data[0];
          let courses = data[1];
          let schema = CoverInfo.schema;
          resolve({coverInfo, schema, courses});
        });
      });
    }
  }
})();
