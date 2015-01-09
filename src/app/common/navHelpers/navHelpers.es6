(function(){

  'use strict';

  angular.module('unacademic.common.navHelpers', [])
         .factory('navHelpers', navHelpers);

  function navHelpers(dispatcher, history){

    return {
      goTo: goTo,
      goBack: goBack
    };

    function goBack(){
      let previous = history.previous();
      if(previous){
        dispatcher.setState(previous);
      }
    }

    function goTo(name, resource){

      if(!resource){
       resource = createNewResource();
      }

      dispatcher.setState({
        name: name,
        resource: {
          id: resource.id,
          curator: resource.curator
        }
      });
    }

    function createNewResource(){
       return {
         id: 'new',
         curator: dispatcher.getState().user
       };
    }
  }
})();
