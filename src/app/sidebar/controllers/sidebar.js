(function(){
  var app = angular.module('unacademic.sidebar.controller', [
    'unacademic.common.mode',
    'unacademic.common.currentUser'
  ]);

  app.controller('Sidebar', Sidebar);

  function Sidebar($scope, $q, mode, currentUser){
    var sidebar = this;

    sidebar.signIn = signIn;
    sidebar.changeMode = changeMode;

    var updateMode = function(){
      sidebar.mode = mode.get();
    }

    var updateUser = function(){
      sidebar.user = currentUser.getId();
    }

    updateMode();
    updateUser();

    mode.registerObserverCallback(updateMode);
    currentUser.registerObserverCallback(updateUser);

    function signIn(){
      currentUser.setId('yeehaa');
    }

    function changeMode(){
      if(sidebar.mode === 'learning'){
        return mode.set('curation');
      }
      return mode.set('learning');
    }
  }
})();
