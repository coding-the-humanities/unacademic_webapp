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

    window.ci = CoverInfo;

    CoverInfo.get().then(function(data){
      vm.info = data;
      vm.info.displayProperties = ["summary", "description"];
    });

    function save(){
      return $q(function(resolve, reject){
        CoverInfo.save(vm.info).then(function(){
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
