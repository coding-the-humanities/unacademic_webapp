(() => {

  'use strict';


  angular.module('unacademic.DataStore', [])
         .factory('DataStore', DataStore);


  function DataStore(baseUrl, $http, $q){
    return {
      get: get,
      save: save
    };
    
    function get(modelName, userId){
      let url = generateUrl(modelName, userId);
      return $http.get(url).then(extractData);
    }
    
    function save(instance){
      let url = generateUrl(instance.constructor.name, instance.curator);
      return $http.put(url, instance);
    }

    function extractData(response){
      return $q(function(resolve, reject){
        let data = response.data;
        resolve(data);
      });
    }
    
    function generateUrl(modelName, userId){
      let resourceName = generateResourceName(modelName);
      let url = `${baseUrl}/${resourceName}/${userId}.json`;
      return url;
    }
    
    function generateResourceName(modelName){
      return modelName.substr(0, 1).toLowerCase() + modelName.substr(1);
    }
  }
})();
