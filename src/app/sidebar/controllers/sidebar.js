(function(){
  var app = angular.module('unacademic.sidebar.controller', [
    'unacademic.common.appState',
  ]);

  app.controller('Sidebar', Sidebar);

  function Sidebar($scope, appState, currentUser){
    var sidebar = this;

    sidebar.signIn = signIn;
    sidebar.changeMode = changeMode;

    var updateAppState = function(){
      var state = appState.get();
      sidebar.user = state.user;
      sidebar.mode = state.mode;
    }

    updateAppState();

    appState.registerObserverCallback(updateAppState);

    function signIn(){
      appState.set({user: 'yeehaa', nextMode: 'learning'})
    }

    function changeMode(){
      if(sidebar.mode === 'learning'){
        return appState.set({nextMode: 'curation'});
      }
      return appState.set({nextMode: 'learning'});
    }
  }
})();
