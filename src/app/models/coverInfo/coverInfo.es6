(() => {

  angular.module('unacademic.models.coverInfo', [])
         .factory('CoverInfo', CoverInfoInit);

  function CoverInfoInit(BaseClass, schema, initData){

    class CoverInfo extends BaseClass {}

    CoverInfo.initialize({schema: schema, initData: initData});

    return CoverInfo;
  };
   
})();
