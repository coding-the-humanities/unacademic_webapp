(function(){


  var app = angular.module('unacademic.models', [
    'unacademic.DS'
  ]);

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  app.factory('CoverInfo', function(baseUrl, $http, $q, DS, appState){
    var $http = $http;

    class CoverInfo {

      constructor({title, summary, description}){
        this.title = title;
        this.curator = appState.get().user;
        this.summary = summary;
        this.description = description;
      }

      save(){
        DS.save(this);
      }

      static get(userId){
        return DS.get('CoverInfo', userId) 
                 .then(CoverInfo.createInstance);
      }

      static createInstance(data){

        var coverInfo;

        return $q(function(resolve, reject){
          if(data){
            coverInfo = new CoverInfo(data);
          } else {
            coverInfo = new CoverInfo(CoverInfo.seed());
          }

          resolve(coverInfo);

        });
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
        return {
          title: "ReAcademic",
          summary: 'Learning by Dwelling',
          description: description,
          paths: ['hello']
        }
      }
    }

    return CoverInfo;
  });
})();
