(function(){

  angular.module('unacademic.models.path.initData', [])
        .factory('pathInitData', pathInitData);


  function pathInitData(dispatcher){

    var description = "Hello World"; 

    return {
      id: "info",
      title: "Coding the Humanities",
      curator: dispatcher.getState().user,
      summary: 'Research through Coding',
      description: description,
      points: ['hello']
    };
  }
})();
