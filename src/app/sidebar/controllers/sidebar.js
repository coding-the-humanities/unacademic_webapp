(function(){
  var app = angular.module('unacademic.sidebar.controller', [
    'unacademic.common.tracker',
    'unacademic.common.currentUser'
  ]);

  app.controller('Sidebar', Sidebar);

  function Sidebar($scope, $q, appState, currentUser){
    var sidebar = this;

    sidebar.signIn = signIn;
    sidebar.changeMode = changeMode;

    var updateMode = function(){
      sidebar.mode = appState.getMode();
    }

    var updateUser = function(){
      sidebar.user = currentUser.getId();
    }

    updateMode();
    updateUser();

    appState.registerObserverCallback(updateMode);
    currentUser.registerObserverCallback(updateUser);

    function signIn(){
      currentUser.setId('yeehaa');
    }

    function changeMode(){
      if(sidebar.mode === 'learning'){
        appState.setMode('curation');
      }
      appState.setMode('learning');
    }
  }
})();
