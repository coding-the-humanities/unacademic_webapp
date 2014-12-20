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

      appState.set({
        user: 'yeehaa',
        mode: 'learning',
        path: 'user.paths'
      });

    };

    function changeMode(){
      if(sidebar.mode === 'learning'){
        return appState.set({mode: 'curation'});
      }
      return appState.set({mode: 'learning'});
    }
  }
})();
