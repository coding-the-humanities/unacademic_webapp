(function(){
  var app = angular.module('unacademic.appState.resource', []);
  app.factory('resource', resource);

  function resource($stateParams){

    let name;

    return {
      name: 'resource',
      get: get,
      set: set
    }

    function get(){
      let params = $stateParams;
      let keys = _.keys(params);
      let defaultName = params[keys[0]];
      return name = name || defaultName;
    }

    function set(newName){
      name = newName;
      return true;
    }
  };
})();
