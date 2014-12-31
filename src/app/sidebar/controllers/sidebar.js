(function(){
  'use strict';

  angular.module('unacademic.sidebar.controller', [])
         .controller('Sidebar', Sidebar);

  function Sidebar($scope, dispatcher){

    var sidebar = this;
    var modelId;

    initialize();

    function initialize(){
      sidebar.signIn = signIn;
      sidebar.changeMode = changeMode;

      updateAppState();

      dispatcher.registerObserverCallback(updateAppState);
      $scope.$watch('sidebar.model', saveFormData, true);
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

    function updateAppState(){
      var state = dispatcher.getState();
      sidebar.user = state.user;
      sidebar.mode = state.mode;
    }

    function saveFormData(newVal, oldVal){
      var form = sidebar.form;
      var modelName = newVal.constructor.name.toLowerCase();

      if(form.$dirty){
        if(!modelId){
          modelId = dispatcher.queue({register: modelName});
        }
        dispatcher.queue({add: modelId});
      }

      if(form.$valid){
        form.$setPristine();
        newVal.save(newVal).then(function(data){
          dispatcher.queue({remove: modelId});
        });
      }
    }
  }
})();
