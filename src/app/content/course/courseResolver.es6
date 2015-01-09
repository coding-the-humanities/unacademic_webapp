(function(){

  'use strict';

  angular.module('unacademic.content.course')
        .factory('courseResolver', courseResolver);

  function courseResolver($q, Course, dispatcher){

    return data;

    function data(){
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
  }
})();
