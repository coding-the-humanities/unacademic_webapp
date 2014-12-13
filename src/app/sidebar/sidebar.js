(function(){
  var app = angular.module('unacademic.sidebar', [])

  app.directive('sidebar', sidebar);

  function sidebar(){
    return {
      templateUrl: 'sidebar/sidebar.html',
      replace: true,
      scope: {
        model: '=',
        actions: '='
      },
      bindToController: true,
      controllerAs: 'sidebar',
      controller: Sidebar
    }
  };

  function Sidebar($scope, tracker){
    var sidebar = this;

    sidebar.mode = tracker.mode;
    sidebar.user = tracker.user;
    sidebar.signIn = signIn;

    $scope.$watch('sidebar', watchSidebar, true);

    function watchSidebar(newValue, oldValue){
      tracker.user = newValue.user;
      if(oldValue.mode === 'curation' && newValue.mode === 'learning'){
        if(newValue.model.$invalid){
          return sidebar.mode = tracker.mode = oldValue.mode;
        }
        sidebar.actions['Save']().then(function(){
          sidebar.mode = tracker.mode = newValue.mode;
        })
      } else {
        tracker.mode = newValue.mode
      }
    }

    function signIn(){
      sidebar.user = "yeehaa";
    }
  }
})();
