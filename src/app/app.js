(function(){
  var app = angular.module('unacademic', [
    'ui.router',
    'templates-app',
    'famous.angular',
    'contenteditable',
    'unacademic.common',
    'unacademic.paths',
    'unacademic.points',
    'unacademic.sidebar'
  ]);

  /*@ngInject*/
  app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/paths/index');
  });

  app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com/');

  // app.constant('baseUrl', 'http://private-7c8dd-unacademic.apiary-mock.com');

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  app.factory('CoverInfo', function($q, baseUrl, $http, currentUser){
    save();
    return {
      get: get,
      save: save,
      ct: changeTitle
    };

    function save(coverInfo){

      var DefaultCoverInfo = {
        title: "UnAcademic",
        summary: 'Learning by Dwelling',
        description: description,
        paths: ['yeehaa_coding_the_humanities']
      }

      var coverInfo = coverInfo || DefaultCoverInfo;
      var id = currentUser.getId() || 'general';

      return $http.put(baseUrl + '/coverInfo/' + id + '.json', coverInfo);
    }

    function changeTitle(){
      return $http.patch(baseUrl + '/coverInfo/general.json', {title: 'ReReAcademic'});
    }

    function get(){
      var deferred = $q.defer();

      $http.get(baseUrl + '/coverInfo/general.json').then(function(response){
        deferred.resolve(response.data);
      });

      return deferred.promise;
    }
  });
})();
