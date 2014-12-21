(function(){
  var app = angular.module('unacademic.paths.controllers.index', []);

  app.controller('Index', Index);

  function Index(paths, coverInfo, $q, appState) {

    var vm = this;

    vm.paths = paths;
    vm.info = coverInfo.get();
    vm.info.displayProperties = ['summary', 'description'];

    vm.actions = {
      'Save': save,
      'Add New Path': addNewPath
    };

    function save(){
      return $q(function(resolve, reject){
        coverInfo.save().then(function(){
          appState.set({mode: 'learning'});
          resolve();
        })
      });
    }

    function addNewPath(){
      return save().then(function(){
        appState.set({name: 'paths.new'})
      });
    }
  };
})();
