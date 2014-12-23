(function(){
  var app = angular.module('unacademic.models', [
  ]);

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  app.factory('CoverInfo', function($q, baseUrl, $http){


    return {
      get: get,
      save: save,
      seed: seed
    };

    function save(coverInfo, id){
      var url = baseUrl + '/coverInfo/' + id + '.json';
      return $http.put(url, coverInfo);
    }

    function get(id){
      return $http.get(baseUrl + '/coverInfo/' + id + '.json')
               .then(extractData);
    }

    function extractData(response){
      return $q(function(resolve, reject){
        resolve(response.data);
      });
    }

    function seed(){
      var coverInfo = {
        title: "ReAcademic",
        summary: 'Learning by Dwelling',
        description: description,
        paths: ['hello']
      }

      return save(coverInfo, 'general');
    }

    //
    // seed().then(function(){
    //   console.log('db seeded');
    // });;


    // function getPaths(data){
    //   var promises = createPathPromises(data);
    //   return $q(function(resolve, reject){
    //     $q.all(promises).then(function(response){
    //       data.paths = response;
    //       resolve(data);
    //     });
    //   });
    // }

    // function getPath(path){
    //   return $q(function(resolve, reject){
    //     $http.get(baseUrl + '/paths/' + path + '.json')
    //     .then(extractData)
    //     .then(function(data){
    //       resolve(data);
    //     });
    //   });
    // };

    // function createPathPromises(data){
    //   return _.map(data.paths, function(path){
    //     return getPath(path);
    //   });
    // }

  });
})();
