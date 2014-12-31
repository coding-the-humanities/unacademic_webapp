(function(){

  angular.module('unacademic.models.coverInfo')
         .factory('initData', initData);


  function initData(dispatcher){
    var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

    return {
      title: "UnAcademic",
      curator: dispatcher.getState().user || 'general',
      summary: 'Learning by Dwelling',
      description: description,
      paths: ['hello']
    };
  }
   
})();
