(function(){
  var app = angular.module('unacademic.points');

  app.controller('NewPoint', function(Point, generateId, $state, tracker, $famous) {
    var vm = this;
    var EventHandler = $famous['famous/core/EventHandler'];

    vm.mode = tracker.mode;
    vm.mode = 'curation';
    vm.info = Point.new({});

    var parent = tracker.parentModel;

    if(parent){
      vm.info.path = parent.title;
    }

    vm.info.displayProperties = ['curator', 'summary', 'description', 'version', 'path'];

    vm.actions = {
      save: save
    }

    function save(){
      var model = vm.info;
      model.id = generateId(model);

      model.$update().then(function(response){

        if(!parent.points){
          parent.points = [];
        }

        parent.points.push(model);
        vm.mode = tracker.mode = 'curation';
        $state.go('paths.details', {pathId: tracker.parentModel.id});
      });
    }
  });
})();
