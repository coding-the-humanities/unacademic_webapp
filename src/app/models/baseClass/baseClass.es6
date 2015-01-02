(() => {
  'use strict';

  angular.module('unacademic.models.baseClass', [])
         .factory('BaseClass', initBaseClass);

  function initBaseClass($http, $q, DataStore, utilities, dispatcher){

    class BaseClass {

      constructor(data){
        let instance = data || {};

        let schema = this.constructor.schema;
        let props = _.keys(schema.properties);

        if(!instance.id){
          instance.id = utilities.generateUID();
        }
        _.each(props, (prop) => { this[prop] = instance[prop]; });
        
        if(!this.curator || this.curator === 'general'){
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

      static get(userId, id){
        let extractData = _.bind(_extractData, this);

        return DataStore.get(this.name, userId, id) 
          .then(extractData);
      }
      
      static initialize({schema, initData}){
        this.schema = schema;
        this.initData = initData;
      }
    }

    function _extractObjects(data){
      if(data){
        let keys = _.keys(data);
        return _.map(keys, (key) => new this(data[key]));
      }
    };

    function _extractData(data){
      if(data){
        return new this(data);
      }
      return new this(this.initData);
    };

    return BaseClass
  };
})();
