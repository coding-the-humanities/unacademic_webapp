(function(){
  var app = angular.module('unacademic', [
    'ui.router',
    'ActiveResource',
    'templates-app',
    'famous.angular',
    'contenteditable',
    'unacademic.paths',
    'unacademic.points'
  ]);

  app.value('tracker', {mode: 'learning', path: ''});

  app.service('generateId', function(){
    function generateId(model){
      var version = model.version.split(".").join("_");
      return parameterize(model.curator) + "_" + parameterize(model.title);
    }

    function parameterize(string){
      return string.toLowerCase().split(' ').join("_");
    }

    return generateId;
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    $urlRouterProvider.otherwise('/paths/index');
  });
})();
