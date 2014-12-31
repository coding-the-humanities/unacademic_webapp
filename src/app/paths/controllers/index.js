(function(){
  'use strict';

  angular.module('unacademic.paths.controllers.index', [])
         .controller('Index', Index);

  function Index(CoverInfo, Path, $q, dispatcher, coverInfo) {

    var vm = this;

    vm.props = {
      schema: CoverInfo.schema,
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
          title: 'Add New Path',
          onClick: function(){
            addNewPath();
          }
        }
      ]
    };

    vm.info = coverInfo;

    dispatcher.registerObserverCallback(updateInfo);

    function addNewPath(){
      dispatcher.setState({name: 'paths.new'});
    }

    function updateInfo(){
      var id = dispatcher.getState().user;
      CoverInfo.get(id).then(function(data){
        vm.info = data;
      });
      // Path.get(id).then(function(data){
      //   vm.paths = [data];
      // })
    }
  };
})();
