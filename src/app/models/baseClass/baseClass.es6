(() => {
  'use strict';

  angular.module('unacademic.models.baseClass', [])
         .factory('BaseClass', initBaseClass);

  function initBaseClass($http, $q, DataStore, dispatcher){
    class BaseClass {

      constructor(data){
        let schema = this.constructor.schema;
        let props = _.keys(schema.properties);
        _.each(props, (prop) => { this[prop] = data[prop]; });
      }

      save(){
        if(!this.curator){
          this.curator = '123';
        }
        return DataStore.save(this);
      }

      static get(userId){
        let extractData = _.bind(_extractData, this);

        return DataStore.get(this.name, userId) 
          .then(extractData);
      }
      
      static initialize({schema, initData}){
        this.schema = schema;
        this.initData = initData;
      }
    }

    function _extractData(data){
      if(data){
        return new this(data);
      }
      return new this(this.initData);
    };

    return BaseClass
  };
})();
