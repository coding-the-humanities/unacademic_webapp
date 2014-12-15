(function(){
  var app = angular.module('unacademic', [
    'ui.router',
    'ActiveResource',
    'templates-app',
    'famous.angular',
    'contenteditable',
    'unacademic.common',
    'unacademic.paths',
    'unacademic.points',
    'unacademic.sidebar'
  ]);


  app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com/.json');

  // app.constant('baseUrl', 'http://private-7c8dd-unacademic.apiary-mock.com');

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

  app.value('tracker', {mode: 'learning', path: '', user: ''});

  app.factory('coverInfo', function($q, $log){
    return {
      save: save,
      get: get
    }

    function save(){
      return $q(function(resolve, reject){
        $log.log("data is saved");
        resolve();
      });
    }

    function get(){
      var coverInfo = {
        title: 'UnAcademic',
        summary: 'Learning By Dwelling',
        description: description
      };
      return coverInfo;
    }
  });

})();
