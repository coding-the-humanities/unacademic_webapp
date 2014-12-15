(function(){
  var app = angular.module('unacademic.paths.controllers.index', []);

  app.controller('Index', Index);

  function Index(paths, coverInfo) {

    var vm = this;

    vm.paths = paths;
    vm.info = coverInfo;

    vm.actions = {
      'Save': save,
      'Add New Path': addNewPath
    };

    function save(){
    }

    function addNewPath(){
      // $state.go('paths.new');
    }
  };

})();
