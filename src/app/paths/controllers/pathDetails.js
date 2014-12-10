var app = angular.module('unacademic');

app.controller('PathDetails', function(path, tracker, $state, $famous, $stateParams) {
  var vm = this;
  var EventHandler = $famous['famous/core/EventHandler'];

  vm.points = _.map(path.points, function(point){
    point.image_url = 'assets/img/objectives/' + makeDirFromTitle(point.title) + '/logo.svg';
    return point;
  });

  vm.mode = tracker.mode;
  vm.info = path;
  vm.info.displayProperties = ['curator', 'summary', 'description', 'version'];

  vm.actions = {
    save: save,
    addPoint: addPoint
  }

  vm.myEventHandler = new EventHandler();

  function save(){
    var model = vm.info;
    model.$update().then(function(response){
      vm.mode = tracker.mode = 'learning';
    });
  }

  function addPoint(){
    save();
    $state.go('points.new');
  }

  function makeDirFromTitle(title){
    return title.toLowerCase().split(' ').join('_');
  }

});
