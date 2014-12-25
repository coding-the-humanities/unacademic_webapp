(function(){


  var app = angular.module('unacademic.models', [
  ]);

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  app.factory('CoverInfo', function(baseUrl, $http, $q, appState){
    var $http = $http;

    class Model {

      constructor(options){
        this.title = options.title;
        this.curator = appState.get().user;
        this.summary = options.summary;
        this.description = options.description;
      }

      get url(){
        return baseUrl + '/coverInfo/' + this.curator + '.json';
      }

      save(){
        Model._save(this);
      }

      static get(userId){
        return $http.get(baseUrl + '/coverInfo/' + userId + '.json')
          .then(Model.extractData);
      }

      static extractData(response){
        return $q(function(resolve, reject){
          var coverInfo = new Model(response.data);
          resolve(coverInfo);
        });
      }

      static _save(coverInfo){
        return $http.put(coverInfo.url, coverInfo);
      }

      static schema(){
        return {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              required: true,
              minLength: 5,
              maxLength: 25

            },
            summary: {
              type: 'string'
            },
            description: {
              type: 'string'
            }
          }
        }
      }

      static seed(){
        var coverInfo = {
          title: "ReAcademic",
          summary: 'Learning by Dwelling',
          description: description,
          paths: ['hello']
        }

        return Model.save(coverInfo, 'general');
      }
    }

    return Model;
  });
})();
