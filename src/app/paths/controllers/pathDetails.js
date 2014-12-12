(function(){
  var app = angular.module('unacademic.paths');

  app.controller('PathDetails', function(path, tracker, $state, $famous, generateId, $q) {
    var vm = this;
    var EventHandler = $famous['famous/core/EventHandler'];
    vm.myEventHandler = new EventHandler();

    vm.points = _.map(path.points, function(point){
      point.image_url = 'assets/img/objectives/' + makeDirFromTitle(point.title) + '/logo.svg';
      return point;
    });

    vm.mode = tracker.mode;
    vm.user = tracker.user;
    vm.info = path;
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
        vm.mode = tracker.mode = 'learning';
        $state.go('paths.index')
      });
    }

    function makeDirFromTitle(title){
      return title.toLowerCase().split(' ').join('_');
    }

  });
})();
