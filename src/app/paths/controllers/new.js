(function(){
  'use strict';

  angular.module('unacademic.paths.controllers.new', [])
         .controller('New', New);

  function New(Path, $q, dispatcher, path) {

    var vm = this;

    vm.props = {
     schema: Path.schema,
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

    vm.info = path;

    dispatcher.registerObserverCallback(updateInfo);

    function addNewObjective(){
      alert('not yet');
    }

    function updateInfo(){
      var id = dispatcher.getState().user;
      Path.get(id).then(function(data){
        vm.info = data;
      })
    }
  };
})();
