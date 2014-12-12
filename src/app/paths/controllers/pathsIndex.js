(function(){
  var app = angular.module('unacademic.paths');

  app.controller('PathsIndex', PathsIndex);
    
  function PathsIndex(paths, $state, $famous, tracker) {

    var vm = this;

    vm.paths = paths;

    vm.info = {
      title: 'UnAcademic',
      summary: 'Learning By Dwelling',
      description: description
    };

    vm.info.displayProperties = ['summary', 'description'];

    vm.actions = {
      save: save,
      addNewPath: addNewPath
    };


    function save(){
      vm.mode = 'learning';
    }

    function addNewPath(){
      $state.go('paths.new');
    }
  };

  var description = "Welcome to UnAcademic. We understand that learning is personal. Therefore everything in our interface is fully customizable. Including this landing page. Start your journey by sliding the curation button below.";


})();
