(function(){
  var app = angular.module('unacademic.points');

  /*@ngInject*/
  app.config(function($stateProvider) {
    $stateProvider
      .state('points', {
        url: '/points',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('points.new', {
        url: '/new',
        controller: 'NewPoint',
        controllerAs: 'newPoint',
        templateUrl: 'points/views/pointDetails.html'
      });
  });

})();
