var app = angular.module('unacademic');

app.controller('NewPath', function(Path, $state, generateId, tracker, $famous) {
  var vm = this;
  var EventHandler = $famous['famous/core/EventHandler'];

  tracker.mode = 'curation';
  vm.mode = tracker.mode;

  vm.info = Path.new({});
  vm.info.displayProperties = ['curator', 'summary', 'description', 'version'];

  vm.actions = {
    save: save,
    addPoint: addPoint,
    done: done
  }

  function save(){
    var model = vm.info;
    if (!model.$valid){ return };
    if(!model.id){
      model.id = generateId(model);
    }
    model.$update().then(function(response){
      vm.mode = tracker.mode = 'learning';
    });
  };

  function addPoint(){
    save();
    $state.go('points.new');
  }

  function done(){
    $state.go('paths.index')
  }

});
