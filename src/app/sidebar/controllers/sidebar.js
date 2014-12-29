(function(){
  'use strict';

  angular.module('unacademic.sidebar.controller', [])
         .controller('Sidebar', Sidebar);

  function Sidebar($scope, dispatcher){

    var sidebar = this;

    sidebar.signIn = signIn;
    sidebar.changeMode = changeMode;

    initialize();

    $scope.$watch('sidebar.model', function(newVal, oldVal){
      var form = sidebar.form;

      if(form.$dirty){
        dispatcher.setState({lock: 'closed'});
      }

      if(form.$valid){
        form.$setPristine();
        newVal.save(newVal).then(function(){
          dispatcher.setState({lock: 'open'});
        });
      }

    }, true);

    function initialize(){
      updateAppState();
      dispatcher.registerObserverCallback(updateAppState);
    }


    function updateAppState(){
      var state = dispatcher.getState();
      sidebar.user = state.user;
      sidebar.mode = state.mode;
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
  }
})();
