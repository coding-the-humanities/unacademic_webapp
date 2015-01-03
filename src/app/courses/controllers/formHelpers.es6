(function(){
  'use strict';

  angular.module('unacademic.courses.controllers')
         .factory('formHelpers', formHelpers);

  function formHelpers(dispatcher){

    return {
      submit: submit,
      checkForm: checkForm
    };

    function submit(form, model){

      if(form.$dirty && form.$valid){
        form.$setPristine();
        model.save().then(success, error);
      }

      function success(){
        dispatcher.queue({remove: model.id});
        dispatcher.setState({resource: model.id});
      }

      function error(){
        form.$setDirty();
        dispatcher.queue({add: model.id});
      }
    }

    function checkForm(form, modelId){
      if(form.$dirty){
        dispatcher.queue({add: modelId});
      }
    }
  }
})();

