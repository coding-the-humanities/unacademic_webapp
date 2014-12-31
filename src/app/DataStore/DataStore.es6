(() => {

  'use strict';


  angular.module('unacademic.DataStore', [])
         .factory('DataStore', DataStore);


  function DataStore(baseUrl, $http, $q, utilities){
    return {
      get: get,
      save: save
    };
    
    function get(modelName, userId){
      let url = utilities.generateUrl(modelName, userId);
      return $http.get(url).then(extractData);
    }
    
    function save(instance){
      let url = utilities.generateUrl(instance.constructor.name, instance.curator, instance.id);
      return $http.put(url, instance);
    }

    function extractData(response){
      return $q(function(resolve, reject){
        let data = response.data;
        resolve(data);
      });
    }
  }

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
