(function(){
  angular.module('unacademic.paths.controllers.index', [])
         .controller('Index', Index);

  function Index(CoverInfo, $q, dispatcher, coverInfo) {

    var vm = this;

    vm.paths = [];

    vm.props = {
      schema: CoverInfo.schema,
      learning: ['summary', 'description'],
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
        { type: 'button',
          title: 'Add New Path',
        }
      ]
    };
    vm.info = coverInfo;

    dispatcher.registerObserverCallback(updateInfo);

    function updateInfo(id){
      var id = id || dispatcher.getState().user;
      CoverInfo.get(id).then(function(data){
        vm.info = data;
      })
    }
  };
})();
