(function(){
  var app = angular.module('unacademic.common', []);

  app.service('generateId', generateId);

  function generateId(){
    function constructId(model){
      if(model.curator && model.title){
        var version = model.version.split(".").join("_");
        return parameterize(model.curator) + "_" + parameterize(model.title);
      }
    }

    function parameterize(string){
      return string.toLowerCase().split(' ').join("_");
    }

    return constructId;
  };
})();
