var app = angular.module('unacademic', [
  'ui.router',
  'ActiveResource',
  'templates-app',
  'unacademic.modules',
])

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/',
    templateUrl: 'layout.tpl.html',
    controller: 'Main as app',
  });

  $urlRouterProvider.otherwise('/');
})

app.controller('Main', function(Path) {
  var app = this;

  /* - Resolve */

  Path.all().then(function(response){
    var paths = response.map(function(path){
      path.editing = false;
      return path;
    });

    app.paths = paths;
  });

  /* - CardCtrl- */

  app.delete = function(path){
    path.$delete().then(function(){
      _.remove(app.paths, path);
    });
  }

  app.save = function(path){
    path.$save().then(function(){
      path.creating = false;
    });
  };

  /* - CardsCtrl - */

  app.add = function(){
    var path = Path.new({name: "new path", curator: "yeehaa", version: "0.0.0"});
    path.creating = true;
    app.paths.push(path);
  }

  app.organize = function(){
    app.paths.map(function(path){
      path.organizing = true;
      return path;
    });
  }

  app.clear = function(){
    app.paths.forEach(function(path){
      path.$delete();
      app.paths = [];
    });
  }
});

app.factory('Path', function(ActiveResource) {

  function Path(data) {
    this.number('id');
    this.string('curator');
    this.string('name');
    this.string('description');
    this.string('version');

    this.validates({
      name: { presence: true },
      curator: { presence: true },
      version: { presence: true },
    });
  };

  Path.inherits(ActiveResource.Base);
  Path.api.set('http://cth.loc/api/0/paths');

  window.Path = Path;

  return Path;
});
