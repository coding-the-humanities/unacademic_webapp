(function(){
  'use strict';

  angular.module('unacademic.sidebar.controller', [])
         .controller('Sidebar', Sidebar);

  function Sidebar($scope, dispatcher, navHelpers){

    var sidebar = this;
    var modelId;

    initialize();

    function initialize(){
      sidebar.changeMode = changeMode;
      sidebar.back = back;
      sidebar.forward = forward;
      sidebar.signIn = signIn;
      sidebar.curation = false;
      updateAppState();
      dispatcher.registerObserverCallback(updateAppState);
      window.sidebar = sidebar;
    }

    function back(){
      navHelpers.goBack();
    }

    function forward(){
      navHelpers.goForward();
    }

    function signIn(){
      return dispatcher.setState({user: 'marijn', mode: 'learning'});
    }

    $scope.$watch('sidebar.mode', changeCuration);
    $scope.$watch('sidebar.curation', changeMode);

    function changeMode(newVal, oldVal){
      if(sidebar.mode !== 'browsing'){
        if(newVal){
          return dispatcher.setState({mode: 'curation'});
        } else {
          return dispatcher.setState({mode: 'learning'});
        }
      }
      return sidebar.curation = false;
    }

    function changeCuration(newVal, oldVal){
      if(sidebar.mode === 'curation'){
        return sidebar.curation = true;
      }
      return sidebar.curation = false;
    }

    function updateAppState(){
      var state = dispatcher.getState();
      sidebar.user = state.user;
      sidebar.mode = state.mode;
    }
  }
})();
