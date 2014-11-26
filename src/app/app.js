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
    controller: 'Main as app'
  });

  $urlRouterProvider.otherwise('/');
})

app.controller('Main', function(Path) {
  var app = this;


  Path.all().then(function(response){
    app.paths = response;
  });

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
