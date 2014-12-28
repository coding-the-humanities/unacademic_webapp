(function(){

  var app = angular.module('unacademic.models.coverInfo');

  app.factory('initData', initData);


  function initData(appState){
    var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

    return {
      title: "UnAcademic",
      curator: appState.get().user,
      summary: 'Learning by Dwelling',
      description: description,
      paths: ['hello']
    };
  }
   
})();
