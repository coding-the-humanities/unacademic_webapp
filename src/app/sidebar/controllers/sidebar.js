(function(){
  'use strict';

  angular.module('unacademic.sidebar.controller', [])
         .controller('Sidebar', Sidebar);

  function Sidebar($scope, dispatcher){

    var sidebar = this;
    var modelId;

    initialize();


    function initialize(){
      sidebar.signIn = signIn;
      sidebar.changeMode = changeMode;
      updateAppState();
      dispatcher.registerObserverCallback(updateAppState);
    }

    function signIn(){
      dispatcher.setState({
        user: 'yeehaa',
        mode: 'learning',
      });
    };

    function changeMode(){
      if(sidebar.mode === 'learning'){
        return dispatcher.setState({mode: 'curation'});
      }
      return dispatcher.setState({mode: 'learning'});
    }

    function updateAppState(){
      var state = dispatcher.getState();
      sidebar.user = state.user;
      sidebar.mode = state.mode;
    }
  }
})();
