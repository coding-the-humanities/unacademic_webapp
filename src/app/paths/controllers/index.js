(function(){
  var app = angular.module('unacademic.paths.controllers.index', []);

  app.controller('Index', Index);

  function Index(CoverInfo, $q, appState, coverInfo) {

    var vm = this;

    vm.paths = [];

    vm.props = {
      schema: CoverInfo.schema(),
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

    appState.registerObserverCallback(updateInfo);

    function updateInfo(id){
      var id = id || appState.get().user;
      CoverInfo.get(id).then(function(data){
        vm.info = data;
      })
    }
  };
})();
