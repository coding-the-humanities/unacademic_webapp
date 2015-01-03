(function(){

  'use strict';

  angular.module('unacademic.courses.controllers.new', [])
         .controller('New', New);

  function New(Course, $q, dispatcher, course) {

    var vm = this;

    vm.props = {
     schema: Course.schema,
      learning: [
        'summary', 
        'description'
      ],
      curation: [
        {
          key: 'title',
        },
        {
          key: 'summary',
        },
        {
          key: 'description',
          type: 'textarea',
        },
        { 
          type: 'button',
          title: 'Add New Objective',
          onClick: function(){
            addNewObjective();
          }
        }
      ]
    };

    vm.info = course;

    dispatcher.registerObserverCallback(updateInfo);

    function addNewObjective(){
      alert('not yet');
    }

    function updateInfo(){
      var state = dispatcher.getState();
      var userId = state.user;
      var id = state.resource;
      Course.get(userId, id).then(function(data){
        vm.info = data;
      })
    }
  };
})();
