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


  app.value('tracker', {mode: 'learning', path: '', user: ''});
  //app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com/.json');

  app.constant('baseUrl', 'http://private-7c8dd-unacademic.apiary-mock.com');


})();
