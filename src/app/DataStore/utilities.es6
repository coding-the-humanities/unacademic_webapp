(() => {

  'use strict';

  angular.module('unacademic.DataStore')
         .factory('utilities', utilities);


  function utilities(baseUrl){
    return {
      generateUrl: generateUrl,
      generateResourceName: generateResourceName,
      generateUID: generateUID,
    };
    
    function generateUrl(modelName, userId, id){
      let resourceName = generateResourceName(modelName);
      if(!id){
        return `${baseUrl}/${resourceName}/${userId}.json`;
      }
      return `${baseUrl}/${resourceName}/${userId}/${id}.json`;
    }
    
    function generateUID(){
      var uid = Date.now();
      return uid;
    }
    
    function generateResourceName(modelName){
      return modelName.substr(0, 1).toLowerCase() + modelName.substr(1);
    }
  }
})();
