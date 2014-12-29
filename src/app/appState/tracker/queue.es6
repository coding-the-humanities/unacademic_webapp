(() => {
  angular.module('unacademic.common.queue', [])
    .factory('queue', queue);

  function queue($log){

    var queue = new Set();

    return {
      get: get,
      set: set,
    }

    function get(){
      return queue;
    }

    function set({add, remove}){

      if(add && remove){
        $log.warn('it is not possible to add and remove at the same time');
        return false;
      }

      if(add){
        queue.add(add);
      }

      if(remove){
        queue.delete(remove);
      }

      return true;
    }
  };
})();
