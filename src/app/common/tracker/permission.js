(function(){
  var app = angular.module('unacademic.common.permission', []);

  app.factory('permission', permission);

  function permission(){

    return {
      set: set
    }

    function set(oldMode, newMode){
      // flag = BOOL
      // options = { oldMode: 'string', newmode: 'string'}
      if(newMode === 'curation'){
        return false;
      }
      return true;
    }
  }
})();
