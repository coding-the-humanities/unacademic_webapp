(() => {

  angular.module('unacademic.models.path', [])
         .factory('Path', PathInit);

  function PathInit(BaseClass, schema, initData){

    class Path extends BaseClass {}

    Path.initialize({schema: schema, initData: initData});

    return Path;
  };
   
})();
