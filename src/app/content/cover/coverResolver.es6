(function(){

  'use strict';

  angular.module('unacademic.content.cover')
        .factory('coverResolver', coverResolver);

  function coverResolver($q, CoverInfo, Course, dispatcher){

    return data;

    function data(){
      let userId = dispatcher.getState().user;
      let promises;

      let coverUser = userId || 'general';

      return $q(function(resolve, reject){
        promises = [
          CoverInfo.get(coverUser, 'info'),
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
