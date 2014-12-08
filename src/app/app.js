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
    .state('paths', {
      url: '/paths',
      template: '<ui-view/>'
    })
    .state('paths.details', {
      url: '/:pathId',
      controller: 'PathDetails as pathDetails',
      templateUrl: 'paths/views/pathDetails.html',
      resolve: {
        path: function(Path){
          return Path.find(1);
        }
      },
    })
  $urlRouterProvider.otherwise('/paths/coding_the_humanities');
});
