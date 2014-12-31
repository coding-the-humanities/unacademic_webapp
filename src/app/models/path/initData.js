(function(){

  angular.module('unacademic.models.path')
        .factory('initData', initData);


  function initData(dispatcher){
    var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";

    return {
      title: "Coding the Humanities",
      curator: dispatcher.getState().user,
      summary: 'Research through Coding',
      description: description,
      points: ['hello']
    };
  }
   
})();
