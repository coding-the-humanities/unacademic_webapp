(function(){
  var app = angular.module('unacademic.appState.resource', []);
  app.factory('resource', resource);

  function resource(){

    let resource;

    return {
      name: 'resource',
      get: get,
      set: set
    }

    function get(){
      return resource;
    }

    function set(newResource){
      resource = newResource;
      return true;
    }
  };
})();
