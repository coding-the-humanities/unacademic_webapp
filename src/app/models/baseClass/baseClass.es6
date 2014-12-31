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

        if(!this.curator){
          this.curator = dispatcher.getState().user;
        }
      }

      save(){

        let schema = this.constructor.schema;
        let props = _.keys(schema.properties);

        let required = _.select(props, required);
        let valid = true;

        _.each(required, (field) => {
          valid = !this[field] ? false : valid;
        });

        if(valid){
          let model = JSON.stringify(this);
          return DataStore.save(this);
        }

        return $q.reject();

      }
      static getAll(userId){
        let extractObjects = _.bind(_extractObjects, this);
        return DataStore.get(this.name, userId) 
          .then(extractObjects);
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

    function getAllProps(){
      let schema = this.constructor.schema;
      let props = _.keys(schema.properties);
    }

    function _extractObjects(data){
      if(data){
        let keys = _.keys(data);
        return _.map(keys, (key) => new this(data[key]));
      }
    };

    function _extractData(data){
      if(data){
        console.log(data.curator);
        return new this(data);
      }
      return new this(this.initData);
    };

    return BaseClass
  };
})();
