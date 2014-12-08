var app = angular.module('unacademic', [
  'ui.router',
  'ActiveResource',
  'templates-app',
  'unacademic.modules',
  'famous.angular',
  'contenteditable'
])

app.value('appMode', 'learning')

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/',
    templateUrl: 'paths/views/pathDetails.html',
    controller: 'PathDetails as pathDetails',
    resolve: {
      path: function(Path){
        return Path.find(1);
      }
    }
  })
  $urlRouterProvider.otherwise('/');
});
