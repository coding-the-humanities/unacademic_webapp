(function(){

  'use strict';

  angular.module('unacademic.content.course')
        .factory('courseResolver', courseResolver);

  function courseResolver($q, Course, dispatcher){

    return data;

    function data(){
      let schema = Course.schema;
      let curatorId = dispatcher.getState().resource.curator;
      let courseId = dispatcher.getState().resource.id;
      let promises;

      return $q(function(resolve, reject){

        if(!curatorId){
          return reject();
        }

        if(curatorId && courseId === 'new'){
          let course = new Course();
          return resolve({schema: schema, info: course, cards: course.waypoints});
        }

        promises = [
          Course.get(curatorId, courseId)
        ];

        $q.all(promises).then(function(data){
          let info = data[0];
          let cards = data[0].waypoints;
          return resolve({name, info, schema, cards});
        });
      });
    }
  }
})();
