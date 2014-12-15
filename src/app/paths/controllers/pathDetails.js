(function(){
  var app = angular.module('unacademic.paths');

  app.controller('PathDetails', function(path, appState, $scope, tracker, $state, $famous, generateId, $q) {
    var vm = this;
    var EventHandler = $famous['famous/core/EventHandler'];
    vm.myEventHandler = new EventHandler();

    vm.points = _.map(path.points, function(point){
      point.image_url = 'assets/img/objectives/' + makeDirFromTitle(point.title) + '/logo.svg';
      return point;
    });

    vm.tracker = tracker;

    vm.info = path;
    vm.info.displayProperties = ['curator', 'summary', 'description', 'version'];

    vm.actions = {
      "Save": save,
      "Add New Point": addPoint,
      "Cancel": cancel,
      "Done": done
    }

    function save(){
      var deferred = $q.defer();
      var model = vm.info;
      model.id = generateId(model);
      if(model.$valid){
        model.$update().then(function(response){
          deferred.resolve();
        }, function(err){
           deferred.reject('could not save your shit');
        });
      } else {
        deferred.reject('complete form first, mothafucka');
      }
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
