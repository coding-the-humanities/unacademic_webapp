(function(){
  var app = angular.module('unacademic.paths');

  app.controller('NewPath', function(Path, $state, generateId, $q, tracker, $famous) {
    var vm = this;
    var EventHandler = $famous['famous/core/EventHandler'];
    vm.myEventHandler = new EventHandler();

    tracker.mode = 'curation';
    vm.mode = tracker.mode;

    vm.info = Path.new({});
    vm.info.displayProperties = ['curator', 'summary', 'description', 'version'];

    vm.actions = {
      save: save,
      addPoint: addPoint,
      cancel: cancel,
      done: done
    }

    function save(){
      var deferred = $q.defer();
      var model = vm.info;
      model.id = generateId(model);
      model.$update().then(function(response){
        deferred.resolve()
      });
      return deferred.promise;
    };

    function addPoint(){
      tracker.parentModel = vm.info;
      $state.go('points.new');
    }

    function cancel(){
      vm.mode = tracker.mode = 'learning';
      $state.go('paths.index')
    }

    function done(){
      save().then(function(){
        vm.mode = tracker.mode = 'curation';
        $state.go('paths.index')
      });
    }

  });
})();
