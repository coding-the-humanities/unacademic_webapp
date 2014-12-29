(function(){
  'use strict';

  angular.module('unacademic.sidebar.controller', [])
         .controller('Sidebar', Sidebar);

  function Sidebar($scope, dispatcher){

    var sidebar = this;

    initialize();

    function initialize(){
      sidebar.signIn = signIn;
      sidebar.changeMode = changeMode;

      updateAppState();

      dispatcher.registerObserverCallback(updateAppState);
      $scope.$watch('sidebar.model', saveFormData, true);
    }

    function updateAppState(){
      var state = dispatcher.getState();
      sidebar.user = state.user;
      sidebar.mode = state.mode;
    }

    function saveFormData(newVal, oldVal){
      var form = sidebar.form;
      var modelId = createModelId(newVal);

      if(form.$dirty){
        dispatcher.queue({add: modelId});
      }

      if(form.$valid){
        form.$setPristine();
        newVal.save(newVal).then(function(){
          dispatcher.queue({remove: modelId});
        });
      }
    }

    function createModelId(model){
      var modelName = model.constructor.name;
      var title = model.title;
      var tempModelId  = modelName + " " + title;
      var modelId = tempModelId.split(" ").join("_").toLowerCase();
      return modelId;
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
