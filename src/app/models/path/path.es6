(() => {

  angular.module('unacademic.models.path', [
    'unacademic.models.path.initData',
    'unacademic.models.path.schema',
  ]).factory('Path', PathInit);

  function PathInit(BaseClass, pathSchema, pathInitData){

    class Path extends BaseClass {}

    Path.initialize({schema: pathSchema, initData: pathInitData});

    return Path;
  };
   
})();
