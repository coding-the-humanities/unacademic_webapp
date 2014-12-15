(function(){
  var app = angular.module('unacademic.sidebar.controller', []);

  app.controller('Sidebar', Sidebar);

  function Sidebar($scope, $q, appState){
    var sidebar = this;

    sidebar.signIn = signIn;

    var updateState = function(){
      sidebar.mode = appState.getMode();
      sidebar.user = appState.getCurrentUserId();
    }

    updateState();
    appState.registerObserverCallback(updateState);

    function signIn(){
      appState.setCurrentUserId('yeehaa')
    }
  }
})();
