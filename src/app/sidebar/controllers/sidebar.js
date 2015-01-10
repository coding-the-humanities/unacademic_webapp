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
      return dispatcher.setState({user: 'yeehaa', mode: 'learning'});
    }

    $scope.$watch('sidebar.mode', changeCuration);
    $scope.$watch('sidebar.curation', changeMode);

    function changeMode(newVal, oldVal){
      if(sidebar.mode === 'browsing'){
        sidebar.curation = false;
      }

      if(sidebar.mode === 'learning'){
        sidebar.curation = false;
        if(newVal){
          dispatcher.setState({mode: 'curation'});
        }
      }

      if(sidebar.mode === 'curation'){
        sidebar.curation = true;
        if(!newVal){
          dispatcher.setState({mode: 'learning'});
        }
      }
    }

    function changeCuration(newVal, oldVal){

      if(sidebar.mode === 'browsing'){
        sidebar.curation = false;
      }

      if(sidebar.mode === 'learning'){
        sidebar.curation = false;
      }

      if(sidebar.mode === 'curation'){
        sidebar.curation = true;
      }
    }

    function updateAppState(){
      var state = dispatcher.getState();
      sidebar.user = state.user;
      sidebar.mode = state.mode;
    }
  }
})();
