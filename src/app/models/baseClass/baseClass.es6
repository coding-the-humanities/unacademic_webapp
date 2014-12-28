(function(){

  var app = angular.module('unacademic.models.baseClass', [
  ]);

  app.factory('BaseClass', function($http, $q, DataStore){
    class BaseClass {

      constructor(data){
        let schema = this.constructor.schema;
        let keys = _.keys(schema.properties);
        _.each(keys, (key) => { this[key] = data[key]; });
      }

      save(){
        DataStore.save(this);
      }
      
      static initialize({schema, initData}){
        this.schema = schema;
        this.initData = initData;
      }

      static get(userId){
        let extractData = _.bind(_extractData, this);

        return DataStore.get(this.name, userId) 
          .then(extractData);


        function _extractData(data){
          if(data){
            return new this(data);
          }
          return new this(this.initData);
        };
      }
    }

    return BaseClass
  });
})();
