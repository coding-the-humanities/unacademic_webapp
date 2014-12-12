(function(){
  var app = angular.module('unacademic', [
    'ui.router',
    'ActiveResource',
    'templates-app',
    'famous.angular',
    'contenteditable',
    'unacademic.paths',
    'unacademic.points',
    'unacademic.sidebar'
  ]);

  app.value('tracker', {mode: 'learning', path: '', user: ''});
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
