(function(){
  var app = angular.module('unacademic.paths.controllers.index', []);

  app.controller('Index', Index);

  function Index(CoverInfo, $q, appState) {

    var vm = this;

    vm.paths = [];

    vm.actions = {
      'Save': save,
      'Add New Path': addNewPath
    };

    updateInfo('general');
    appState.registerObserverCallback(updateInfo);

    function updateInfo(id){
      var id = id || appState.get().user;
      CoverInfo.get(id).then(function(data){
        vm.info = data;
        vm.info.displayProperties = ["summary", "description"];
      })
    }

    function save(){
      var id = appState.get().user;
      return $q(function(resolve, reject){
        CoverInfo.save(vm.info, id).then(function(data){
          resolve();
        });
      });
    }

    function addNewPath(){
      return save().then(function(){
        appState.set({name: 'paths.new'});
      });
    }
  };
})();
