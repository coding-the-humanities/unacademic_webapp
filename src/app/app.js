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

  app.remove= remove;
  app.save = save;

  /* - CardsCtrl - */

  app.viewActions = pathActions();
  app.organizeActions = pathActions(true);

  function save(path){
    path.$save().then(function(){
      path.creating = false;
    });
  };

  function remove(path){
    path.$delete().then(function(){
      _.remove(app.paths, path);
    });
  }

  function pathActions(organizing){

    function add(){
      var path = Path.new({name: "new path", curator: "yeehaa", version: "0.0.0"});
      path.creating = true;
      app.paths.push(path);
    }

    function organize(){
      app.paths.map(function(path){
        app.organizing = true;
        path.organizing = true;
        return path;
      });
    }

    function done(){
      app.paths.map(function(path){
        app.organizing = false;
        path.organizing = false;
        return path;
      });
    }

    function clear(){
      app.paths.forEach(function(path){
        path.$delete();
        app.paths = [];
      });
    }

    if(!organizing){
      return {
        add: add,
        organize: organize,
        clear: clear
      }
    } else {

      return {
        add: add,
        done: done,
        clear: clear
      }
    }

  };


});

app.factory('Path', function(ActiveResource) {

  function Path(data) {
    this.number('id');
    this.string('curator');
    this.string('title');
    this.string('description');
    this.number('forked_from');
    this.string('version');
    this.forks = data.forks;
    this.places = data.places;
    this.learners = data.learners;
    this.isFork = !!data.forked_from;


    this.validates({
      title: { presence: true },
      curator: { presence: true },
      version: { presence: true },
    });
  };

  Path.inherits(ActiveResource.Base);
  Path.api.set('http://private-7c8dd-unacademic.apiary-mock.com');

  window.Path = Path;

  return Path;
});
