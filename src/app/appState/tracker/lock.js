(function(){
  'use strict';
  angular.module('unacademic.common.lock', [])
         .factory('lock', lock);

  function lock(){

    var lockState = 'open';

    return {
      getState: getState,
      setState: setState,
    }

    function getState(){
      return lockState;
    }

    function setState(newState){
      console.log(lockState);
      lockState = newState;
      return true;
    }
  };
})();
