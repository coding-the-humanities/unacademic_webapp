(function(){
  var app = angular.module('unacademic.sidebar');

  app.controller('Sidebar', Sidebar);

  function Sidebar($scope, tracker, appState){
    var sidebar = this;

    sidebar.mode = tracker.mode;
    sidebar.user = tracker.user;
    sidebar.signIn = signIn;

    $scope.$watch('sidebar', watchSidebar, true);

    function watchSidebar(newValue, oldValue){
      tracker.user = newValue.user;
      changeMode(newValue, oldValue);
    }

    function changeMode(newValue, oldValue){
      if(oldValue.mode === 'curation' && newValue.mode === 'learning'){
        sidebar.actions['Save']().then(function(){
          tracker.mode = newValue.mode;
        }, function(err){
          sidebar.mode = tracker.mode = oldValue.mode;
          alert(err);
        })
      } else {
        tracker.mode = newValue.mode
      }
    }

    function signIn(){
      appState.setCurrentUserId('id');
      sidebar.user = "yeehaa";
    }
  }
})();
