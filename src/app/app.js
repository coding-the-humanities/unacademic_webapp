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

  app.value('tracker', {mode: 'learning', path: '', user: ''});
  app.value('coverInfo', {
    title: 'UnAcademic',
    summary: 'Learning By Dwelling',
    description: description,
    displayProperties: ['summary', 'description']
  });

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";
})();
