var app = angular.module('unacademic');

app.controller('NewPoint', function(Point, generateId, tracker, $famous) {
  var vm = this;
  var EventHandler = $famous['famous/core/EventHandler'];

  vm.mode = tracker.mode;
  vm.mode = 'curation';
  vm.info = Point.new({});
  vm.info.displayProperties = ['curator', 'summary', 'description', 'version'];

  vm.actions = {
    save: save
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
  }
});
