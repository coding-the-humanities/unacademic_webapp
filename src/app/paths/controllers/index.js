(function(){
  'use strict';

  angular.module('unacademic.paths.controllers.index', [])
         .controller('Index', Index);

  function Index(CoverInfo, Path, $q, dispatcher, coverInfo, paths) {

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
    vm.paths = paths;

    dispatcher.registerObserverCallback(updateInfo);

    function addNewPath(){
      dispatcher.setState({name: 'paths.new'});
    }

    function updateInfo(){
      var id = dispatcher.getState().user;
      var promises = [
        CoverInfo.get(id),
        Path.getAll(id)
      ]

      $q.all(promises).then(function(data){
        vm.info = data[0];
        console.log(data[1]);
        vm.paths = data[1];
      })
    }
  };
})();
