(function(){

  angular.module('unacademic.models.baseClass', [])
         .factory('BaseClass', initBaseClass);

  function initBaseClass($http, $q, DataStore){
    class BaseClass {

      constructor(data){
        let schema = this.constructor.schema;
        let keys = _.keys(schema.properties);
        _.each(keys, (key) => { this[key] = data[key]; });
      }

      save(){
        DataStore.save(this);
      }

      static get(userId){
        let extractData = _.bind(this.extractData, this);

        return DataStore.get(this.name, userId) 
          .then(extractData);
      }
      
      static initialize({schema, initData}){
        this.schema = schema;
        this.initData = initData;
      }
    }

    BaseClass.extractData = function(data){
      if(data){
        return new this(data);
      }
      return new this(this.initData);
    };

    return BaseClass
  };
})();
